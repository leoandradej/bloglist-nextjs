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
    <div className="card" data-testid="user-profile">
      <h2>My Profile</h2>
      <p data-testid="user-name">Name: {user.name}</p>
      <p data-testid="user-username">Username: {user.username}</p>

      <hr />

      <div className="container" data-testid="reading-list-section">
        <h3>Reading List</h3>

        {userReadingList.length === 0 ? (
          <p data-testid="empty-reading-list">No blogs in reading list yet.</p>
        ) : (
          <>
            <div className="container" data-testid="unread-section">
              <h4>Unread ({unread.length})</h4>
              {unread.length === 0 ? (
                <p data-testid="no-unread-blogs">No unread blogs.</p>
              ) : (
                <ul>
                  {unread.map(({ id, blog }) => (
                    <li key={id} className="unread">
                      <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                      <form action={markAsRead}>
                        <input type="hidden" name="id" value={id} />
                        <button
                          type="submit"
                          className="unread-btn"
                          data-testid={`mark-read-${id}`}
                        >
                          Mark as Read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h4>Read ({read.length})</h4>
            <ul>
              {read.map(({ id, blog }) => (
                <li key={id} className="read">
                  <Link href={`/blogs/$blog.id`}>{blog.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <hr />

      <div className="container" data-testid="api-token-section">
        <h3>API Token</h3>
        {user.token ? (
          <div
            data-testid="token-display"
            className="bg-gray-400 p-4 rounded flex flex-col"
          >
            Current Token:{" "}
            <code data-testid="api-token" className="bg-gray-500 p-2 rounded">
              {user.token}
            </code>
          </div>
        ) : (
          <p data-testid="no-token-message">No token generated yet.</p>
        )}
        <form action={generateToken}>
          <button type="submit" data-testid="generate-token-button">
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default MePage;
