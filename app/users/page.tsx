import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();

  return (
    <div>
      <h2>Users</h2>
      <ul className="flex flex-col p-2 border border-yellow-200 rounded-md">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>
              <h3 className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                {user.name}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
