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
    <div className="container" data-testid="blogs-list">
      <h2>Blogs</h2>

      <form className="form flex-row">
        <input
          type="text"
          name="filter"
          defaultValue={filter ?? ""}
          placeholder="Search by title..."
          data-testid="filter-input"
        />
        <button type="submit" data-testid="search-button">
          Search
        </button>
      </form>

      <ul>
        {blogs.map(({ id, title, author, url, likes }) => (
          <div key={id} className="card">
            <Link href={`/blogs/${id}`}>
              <h3>{title}</h3>
            </Link>
            <span>Author: {author}</span>
            <span>
              URL: <Link href={url}>{url}</Link>
            </span>
            <span>{likes} likes</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
