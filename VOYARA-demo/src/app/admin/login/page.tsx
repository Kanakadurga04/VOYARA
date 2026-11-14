"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, password, "admin");
    if (err) return setError(err);
    router.push("/admin");
  };

  return (
    <div className="page narrow">
      <h1>Admin Login</h1>
      <p className="muted">Only administrators can open the Admin Panel.</p>
      <form className="form" onSubmit={submit}>
        <label>Admin email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <div className="error">{error}</div>}
        <button className="btn dark" type="submit">Login as Admin</button>
        <span>Not an admin? <Link href="/login">User Login</Link></span>
        <small className="muted">Demo admin: admin@voyara.com / admin123</small>
      </form>
    </div>
  );
}
