"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/users">Users</Link>
      <div className="navbar-right">
        {session ? (
          <>
            <Link href="/blogs/new">Create New</Link>
            <em className="text-teal-300">
              {session.user?.name} logged in
            </em>{" "}
            <button onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
