import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  const { username, name, password } = await req.json();
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning();

  return NextResponse.json(result[0], { status: 201 });
};
