import { db } from "@/db";
import type { Post } from "@prisma/client";

export async function getAllPosts(): Promise<Post[]> {
    try {
      const posts = await db.post.findMany({
        orderBy: {
          createdAt: "desc", // Optional: Order posts by creation date
        },
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts");
    }
  }