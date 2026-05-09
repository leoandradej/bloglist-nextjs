import Link from "next/link";
import { notFound } from "next/navigation";
import { incrementBlogLikes } from "../../actions/blogs";
import { getBlogById } from "../../services/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) notFound();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl text-yellow-500">{blog.title}</h3>
      <span>Author: {blog.author}</span>
      <span>
        URL:{" "}
        <Link
          href={blog.url}
          className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
        >
          {blog.url}
        </Link>
      </span>
      <span>Likes: {blog.likes}</span>
      <form action={incrementBlogLikes}>
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="bg-yellow-400 rounded-md py-1 px-4 w-fit text-gray-700 font-bold hover:bg-amber-400 transition-colors duration-300 cursor-pointer"
        >
          Like
        </button>
      </form>
    </div>
  );
};

export default BlogPage;
