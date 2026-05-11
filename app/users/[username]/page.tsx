import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserByUsername } from "../../services/users";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) notFound();

  return (
    <div>
      <h2 className="text-2xl text-yellow-500">{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3 className="text-xl mb-2">Blogs</h3>
      <ul className="flex flex-col gap-2">
        {user.blogs.map(({ id, title, author, url, likes }) => (
          <li
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
