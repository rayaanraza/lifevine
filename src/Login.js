import React, { useState } from "react";
import { useAuth } from "./AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try { await login(form.email, form.password); nav("/dashboard"); }
    catch (e) { setErr(e.message); }
  };

  return (
    <div className="site">
      <header className="brand">
        <span className="brand-word">Life</span>
        <span className="brand-word">Vine</span>
      </header>

      <main className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">Log in</h1>

          <form className="auth-form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
              autoComplete="email"
            />

            <label className="sr-only" htmlFor="password">Password</label>
            <input
              id="password"
              className="input"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
              autoComplete="current-password"
            />

            <button className="btn" type="submit">Log in</button>
          </form>

          {err && <p className="error">{err}</p>}

          <p className="subtext">
            Don't have an account? <Link className="link" to="/register">Create one here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
