import NavBar from "./components/NavBar";
import AuthSessionProvider from "./components/SessionProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="max-w-2xl my-0 mx-auto">
        <AuthSessionProvider>
          <NavBar />
          <main className="">{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
