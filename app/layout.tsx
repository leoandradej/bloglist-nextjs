import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="max-w-2xl my-0 mx-auto">
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
            href="/blogs/new"
            className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
          >
            Create New
          </Link>
          {" | "}
          <Link href="/users">Users</Link>
        </nav>
        <main className="">{children}</main>
      </body>
    </html>
  );
}
