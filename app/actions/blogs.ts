"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { addBlog, incrementLikes } from "../services/blogs";

export const createBlog = async (formData: FormData) => {
  const session = await auth();
  if (!session) redirect("/login");

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  await addBlog({ title, author, url });

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const incrementBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await incrementLikes(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
