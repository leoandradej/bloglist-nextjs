import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();

  return (
    <div className="container">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="card">
            <Link href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
