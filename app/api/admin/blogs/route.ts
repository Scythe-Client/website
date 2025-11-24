import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Blog from "@/app/models/Blog";

const ADMIN_ROLES = ["OWNER", "DEVELOPER", "ADMIN"];

export async function POST(req: NextRequest) {
  await connectDB();

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (user.publicMetadata.role as string) || "";
  if (!ADMIN_ROLES.includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, shortDescription, content, backgroundImage, tag, author } = body;

  if (!title || !shortDescription || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  const readTime = `${minutes} min read`;

  const displayAuthor =
    author ||
    user.fullName ||
    user.emailAddresses?.[0]?.emailAddress ||
    "Admin";

  const blog = await Blog.create({
    title,
    shortDescription,
    content,
    backgroundImage: backgroundImage || "",
    tag: tag || "Announcement",
    author: displayAuthor,
    readTime,
  });

  return NextResponse.json(blog, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (user.publicMetadata.role as string) || "";
  if (!ADMIN_ROLES.includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const deleted = await Blog.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
