import React from "react";
import { useAuth } from "./AuthenticationContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <main className="auth-wrapper">
      <div className="auth-stack">   {/* width-limited, no white box */}
        <h1 className="auth-title">
          Welcome{user?.displayName ? `, ${user.displayName}` : ""} to LifeVine!
        </h1>

        <button className="btn" onClick={logout}>
          Sign out
        </button>
      </div>
    </main>
  );
}
