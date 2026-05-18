import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "../../db";
import { readingList } from "../../db/schema";
import { markAsRead } from "../actions/blogs";
import { generateToken } from "../actions/users";
import { getCurrentUser } from "../services/session";

const MePage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const userReadingList = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: { blog: true },
  });

  const unread = userReadingList.filter((item) => !item.read);
  const read = userReadingList.filter((item) => item.read);

  return (
    <div className="card">
      <h2>My Profile</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>

      <hr />

      <h3>Reading List</h3>

      <h4>Unread ({unread.length})</h4>
      <ul>
        {unread.map(({ id, blog }) => (
          <li key={id} className="unread">
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <form action={markAsRead}>
              <input type="hidden" name="id" value={id} />
              <button type="submit" className="unread-btn">
                Mark as Read
              </button>
            </form>
          </li>
        ))}
      </ul>

      <h4>Read ({read.length})</h4>
      <ul>
        {read.map(({ id, blog }) => (
          <li key={id} className="read">
            <Link href={`/blogs/$blog.id`}>{blog.title}</Link>
          </li>
        ))}
      </ul>

      <hr />

      <h3>API Token</h3>
      {user.token ? (
        <p className="bg-gray-400 p-4 rounded flex flex-col">
          Current Token:{" "}
          <code className="bg-gray-500 p-2 rounded">{user.token}</code>
        </p>
      ) : (
        <p>No token generated yet.</p>
      )}
      <form action={generateToken}>
        <button type="submit">Generate New Token</button>
      </form>
    </div>
  );
};

export default MePage;
