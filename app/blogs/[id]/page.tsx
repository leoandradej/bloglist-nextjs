import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "../../../db";
import { readingList } from "../../../db/schema";
import { addToReadingList, incrementBlogLikes } from "../../actions/blogs";
import { getBlogById } from "../../services/blogs";
import { getCurrentUser } from "../../services/session";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  if (!blog) notFound();

  const user = await getCurrentUser();

  const inReadingList = user
    ? await db.query.readingList.findFirst({
        where: and(
          eq(readingList.userId, user.id),
          eq(readingList.blogId, blog.id),
        ),
      })
    : null;

  return (
    <div className="card" data-testid="blog-detail">
      <h3 data-testid="blog-title">{blog.title}</h3>
      <span data-testid="blog-author">by {blog.author}</span>
      <span>
        Visit: <Link href={blog.url}>{blog.url}</Link>
      </span>
      <div className="blog-actions">
        <span>Likes: {blog.likes}</span>
        <form action={incrementBlogLikes}>
          <input type="hidden" name="id" value={id} />
          <button type="submit">Like</button>
        </form>
        {user && user.id !== blog.userId && !inReadingList && (
          <form action={addToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              type="submit"
              className="reading-list-btn"
              data-testid="add-to-reading-list-button"
            >
              Add to Reading List
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
