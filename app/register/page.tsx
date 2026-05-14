import { registerUser } from "../actions/users";

export default function RegisterPage() {
  return (
    <div>
      <h2 className="text-2xl mb-2">Register</h2>
      <form action={registerUser} className="flex flex-col gap-2">
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
            Name:
            <input
              type="text"
              name="name"
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
          Register
        </button>
      </form>
    </div>
  );
}
