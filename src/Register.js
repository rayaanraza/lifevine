import React, { useState } from "react";
import { useAuth } from "./AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";
import logoUrl from "./logo/logo.avif";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register(form.email, form.password, { displayName: form.displayName });
      nav("/dashboard");
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="site">
      <header className="brand">
        <img className="logo" src={logoUrl} alt="LifeVine logo" />   {}
        <span>LifeVine</span>
      </header>

      <main className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">Create an account</h1>

          <form className="auth-form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="displayName">Name</label>
            <input
              id="displayName"
              className="input"
              name="displayName"
              type="text"
              placeholder="Name"
              value={form.displayName}
              onChange={onChange}
              autoComplete="name"
            />

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
              placeholder="Password (6+ characters)"
              value={form.password}
              onChange={onChange}
              required
              minLength={6}
              autoComplete="new-password"
            />

            <button className="btn" type="submit">Sign up</button>
          </form>
          {err && <p className="error">{err}</p>}
          <p className="subtext">
            Already have an account?{" "}
            <Link className="link" to="/login">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  
  );
}
