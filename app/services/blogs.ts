import { eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs, readingList } from "../../db/schema";

export const getBlogs = async () => {
  return db.query.blogs.findMany();
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addBlog = async ({
  title,
  author,
  url,
  userId,
}: {
  title: string;
  author: string;
  url: string;
  userId: number;
}) => {
  const result = await db
    .insert(blogs)
    .values({ title, author, url, userId })
    .returning();
  const blog = result[0];
  await db.insert(readingList).values({ userId, blogId: blog.id });
};

export const incrementLikes = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};
