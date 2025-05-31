"use server";
import { z } from "zod";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/path";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const topicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Name must be lowercase and can only contain letters and dashes",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const session = await auth();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  // Validate formData using Zod
  const result = topicSchema.safeParse({ name, description });

  if (!result.success) {
    console.error("Validation failed:", result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }
  if (!session?.user || !session) {
    return {
      errors: {
        _form: ["User not authenticated"],
      },
    };
  }
  let topic: Topic | null = null;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating topic:", error.message);
      return {
        errors: {
          _form: [error.message],
        },
      };
    }
  }

  if (topic) {
    revalidatePath(paths.homePage());
    redirect(paths.topicShow(topic.slug));
  } else {
    return {
      errors: {
        _form: ["Failed to create topic"],
      },
    };
  }
}
