"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

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
      router.refresh();
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-2">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              required
              className="border border-white p-0.5 rounded-md mx-1 focus:border-yellow-400 focus:outline focus:outline-yellow-400"
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              required
              className="border border-white p-0.5 rounded-md mx-1 focus:border-yellow-400 focus:outline focus:outline-yellow-400"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-yellow-400 rounded-md py-1 px-4 w-fit text-gray-700 font-bold hover:bg-amber-400 transition-colors duration-300 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
