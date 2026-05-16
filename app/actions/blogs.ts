"use server";

type BlogErrors = { title?: string; author?: string; url?: string };

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { addBlog, incrementLikes } from "../services/blogs";

export const createBlog = async (
  prevState: {
    errors: BlogErrors;
    success?: boolean;
    values?: { title: string; author: string; url: string };
  },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) redirect("/login");

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: BlogErrors = {};
  if (!title || title.length < 5)
    errors.title = "Title must be at least 5 characters";
  if (!author || author.length < 5)
    errors.author = "Author must be at least 5 characters";
  if (!url || url.length < 5) errors.url = "URL must be at least 5 characters";

  if (Object.keys(errors).length > 0)
    return { errors, values: { title, author, url } };

  await addBlog({ title, author, url });

  revalidatePath("/blogs");
  return {
    errors: {} as BlogErrors,
    success: true,
    values: { title, author, url },
  };
};

export const incrementBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await incrementLikes(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
