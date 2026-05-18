import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { users } from "../../../db/schema";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
  });

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    blogs: user.blogs,
  });
};
