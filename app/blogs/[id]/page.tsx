import Link from "next/link";
import { notFound } from "next/navigation";
import { incrementBlogLikes } from "../../actions/blogs";
import { getBlogById } from "../../services/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) notFound();

  return (
    <div className="container">
      <h3>{blog.title}</h3>
      <span>Author: {blog.author}</span>
      <span>
        URL: <Link href={blog.url}>{blog.url}</Link>
      </span>
      <span>Likes: {blog.likes}</span>
      <form action={incrementBlogLikes}>
        <input type="hidden" name="id" value={id} />
        <button type="submit">Like</button>
      </form>
    </div>
  );
};

export default BlogPage;
