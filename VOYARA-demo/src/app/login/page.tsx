"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UserLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, password, "user");
    if (err) return setError(err);
    router.push("/dashboard");
  };

  return (
    <div className="page narrow">
      <h1>User Login</h1>
      <p className="muted">Sign in to book and manage your trips.</p>
      <form className="form" onSubmit={submit}>
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Login</button>
        <span>New here? <Link href="/signup">Create an account</Link></span>
        <span>Administrator? <Link href="/admin/login">Admin Login</Link></span>
        <small className="muted">Demo user: user@voyara.com / user123</small>
      </form>
    </div>
  );
}
