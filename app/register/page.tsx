"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { username: "", name: "" },
  });

  return (
    <div className="container">
      <h2>Register</h2>
      {state.errors?.general && (
        <span className="text-sm text-red-500">{state.errors.general}</span>
      )}
      <form action={formAction} className="form">
        <div className="relative">
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values?.username}
            />
          </label>
          {state.errors?.username && (
            <span className="error-message" data-testid="username-error">
              {state.errors.username}
            </span>
          )}
        </div>
        <div className="relative">
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values?.name} />
          </label>
          {state.errors.name && (
            <span className="error-message">{state.errors.name}</span>
          )}
        </div>
        <div className="relative">
          <label>
            Password
            <input type="password" name="password" />
          </label>
          {state.errors?.password && (
            <span className="error-message">{state.errors.password}</span>
          )}
        </div>
        <div className="relative">
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" />
          </label>
          {state.errors?.passwordConfirm && (
            <span className="error-message" data-testid="passwordConfirm-error">
              {state.errors.passwordConfirm}
            </span>
          )}
        </div>
        <button type="submit" className="mx-auto" data-testid="register-button">
          Register
        </button>
      </form>
    </div>
  );
}
