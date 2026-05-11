import { eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

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
}: {
  title: string;
  author: string;
  url: string;
}) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  });
  await db.insert(blogs).values({ title, author, url, userId: user.id });
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
