"use client";

import { useActionState } from "react";
import { generateToken } from "../actions/users";

export default function TokenSection({
  initialToken,
}: {
  initialToken: string | null;
}) {
  const [state, formAction] = useActionState(generateToken, {
    token: initialToken,
  });

  return (
    <div className="container" data-testid="api-token-section">
      <h3>API Token</h3>
      {state.token ? (
        <div
          data-testid="token-display"
          className="bg-gray-400 p-4 rounded flex flex-col"
        >
          Current Token:{" "}
          <code data-testid="api-token" className="bg-gray-500 p-2 rounded">
            {state.token}
          </code>
        </div>
      ) : (
        <p data-testid="no-token-message">No token generated yet.</p>
      )}
      <form action={formAction}>
        <button type="submit" data-testid="generate-token-button">
          Generate New Token
        </button>
      </form>
    </div>
  );
}
