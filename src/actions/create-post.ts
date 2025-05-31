"use server";
import { z } from "zod";
import type { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/path";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const topicSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Name must be lowercase and can only contain letters and dashes",
    }),
    content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await auth();
  console.log("FormData:", formData);
  const title =(formData.get("title") as string).trim(); 
  const content =(formData.get("content") as string).trim();

  // Validate formData using Zod
  const result = topicSchema.safeParse({ title, content });

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
  const topic = await db.topic.findFirst({
    where: {
      slug: slug,
    },
  });
  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }
  let post: Post | null = null;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        user: { connect: { id: session.user.id } }, // Assuming session.user.id is the user ID
        topic: { connect: { id: topic.id as string } }, // Assuming topicId is provided in formData
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

  if (post) {
    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug , post.id));
  } else {
    return {
      errors: {
        _form: ["Failed to create topic"],
      },
    };
  }
}
