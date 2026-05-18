"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../../db";
import { users } from "../../db/schema";
import { getCurrentUser } from "../services/session";

export const registerUser = async (
  prevState: {
    errors: {
      username?: string;
      name?: string;
      password?: string;
      passwordConfirm?: string;
      general?: string;
    };
    values?: { username: string; name: string };
  },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const errors: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
    general?: string;
  } = {};

  if (!username || username.length < 4)
    errors.username = "Username must be at least 4 characters";
  if (!name || name.length < 5)
    errors.name = "Name must be ar least 5 characters";
  if (!password || password.length < 4)
    errors.password = "Password must be at least 4 characters";
  if (password !== passwordConfirm)
    errors.passwordConfirm = "Passwords do not match";

  if (Object.keys(errors).length > 0)
    return { errors, values: { username, name } };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser)
    return {
      errors: { general: "Username already taken" },
      values: { username, name },
    };

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

export const generateToken = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const token = crypto.randomUUID();
  await db.update(users).set({ token }).where(eq(users.id, user.id));
  revalidatePath("/me");
};
