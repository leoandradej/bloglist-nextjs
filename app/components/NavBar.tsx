"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link href="/blogs" className={pathname === "/blogs" ? "active" : ""}>
        Blogs
      </Link>
      <Link href="/users" className={pathname === "/users" ? "active" : ""}>
        Users
      </Link>
      <div className="navbar-right">
        {session ? (
          <>
            <Link
              href="/blogs/new"
              className={pathname === "/blogs/new" ? "active" : ""}
            >
              Create New
            </Link>
            <Link href="/me" className={pathname === "/me" ? "active" : ""}>
              Me
            </Link>
            <button onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={pathname === "/login" ? "active" : ""}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={pathname === "/register" ? "active" : ""}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
