import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import { NotificationProvider } from "./components/NotificationProvider";
import AuthSessionProvider from "./components/SessionProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main>{children}</main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
