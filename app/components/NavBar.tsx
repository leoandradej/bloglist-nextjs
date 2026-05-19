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
        home
      </Link>
      <Link href="/blogs" className={pathname === "/blogs" ? "active" : ""}>
        blogs
      </Link>
      <Link href="/users" className={pathname === "/users" ? "active" : ""}>
        users
      </Link>
      <div className="navbar-right">
        {session ? (
          <>
            <Link
              href="/blogs/new"
              className={pathname === "/blogs/new" ? "active" : ""}
            >
              create new
            </Link>
            <Link href="/me" className={pathname === "/me" ? "active" : ""}>
              me
            </Link>
            <button onClick={() => signOut()}>logout</button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={pathname === "/login" ? "active" : ""}
            >
              login
            </Link>
            <Link
              href="/register"
              className={pathname === "/register" ? "active" : ""}
            >
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
