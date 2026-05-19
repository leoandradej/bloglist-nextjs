"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { useNotification } from "../components/NotificationProvider";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { showNotification } = useNotification();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      showNotification("Logged in successfully!");
      router.refresh();
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && (
        <p className="text-red-500" data-testid="error-message">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <button type="submit" className="mx-auto" data-testid="login-button">
          Login
        </button>
      </form>
    </div>
  );
}
