"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="py-2">
      <Link
        href="/"
        className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
      >
        Home
      </Link>
      {" | "}
      <Link
        href="/blogs"
        className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
      >
        Blogs
      </Link>
      {" | "}
      <Link
        href="/users"
        className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
      >
        Users
      </Link>
      {" | "}
      {session ? (
        <>
          <Link
            href="/blogs/new"
            className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
          >
            Create New
          </Link>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          {" | "}
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
