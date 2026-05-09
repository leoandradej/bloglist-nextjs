import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = (await getBlogs()).sort((a, b) => b.likes - a.likes);

  const blogs = filter
    ? allBlogs.filter((b) =>
        b.title.toLowerCase().includes(filter.toLocaleLowerCase()),
      )
    : allBlogs;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl">Blogs</h2>

      <form>
        <input
          type="text"
          name="filter"
          defaultValue={filter ?? ""}
          placeholder="Search by title..."
          className=" mr-1 border border-white rounded-md p-1 focus:border-yellow-400 focus:outline focus:outline-yellow-400"
        />
        <button
          type="submit"
          className="bg-yellow-400 rounded-md py-1 px-4 w-fit text-gray-700 font-bold hover:bg-amber-400 transition-colors duration-300 cursor-pointer"
        >
          Search
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {blogs.map(({ id, title, author, url, likes }) => (
          <div
            key={id}
            className="flex flex-col p-2 border border-yellow-200 rounded-md"
          >
            <Link href={`/blogs/${id}`}>
              <h3 className="text-xl text-yellow-500">{title}</h3>
            </Link>
            <span>Author: {author}</span>
            <span>
              URL:{" "}
              <Link
                href={url}
                className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
              >
                {url}
              </Link>
            </span>
            <span>Likes: {likes}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
