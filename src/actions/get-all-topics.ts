import { db } from "@/db";
import type { Topic } from "@prisma/client";

export async function getAllTopics(): Promise<Topic[]> {
    try {
      const topics = await db.topic.findMany({
        orderBy: {
          createdAt: "desc", // Optional: Order topics by creation date
        },
      });
      return topics;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw new Error("Failed to fetch topics");
    }
  }