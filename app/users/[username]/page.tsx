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
    <div className="container">
      <div>
        <h2>{user.name}</h2>
        <p className="text-yellow-400">Username: {user.username}</p>
      </div>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map(({ id, title, author, url, likes }) => (
          <li key={id} className="card">
            <Link href={`/blogs/${id}`}>
              <h3>{title}</h3>
            </Link>
            <span>Author: {author}</span>
            <span>
              URL: <Link href={url}>{url}</Link>
            </span>
            <span>Likes: {likes}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
