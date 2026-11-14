"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const set = (key: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF({ ...f, [key]: key === "phone" ? e.target.value.replace(/\D/g, "") : e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = signup(f);
    if (err) return setError(err);
    router.push("/dashboard");
  };

  return (
    <div className="page narrow">
      <h1>Create account</h1>
      <p className="muted">Join VOYARA to start booking.</p>
      <form className="form" onSubmit={submit}>
        <label>Full name<input value={f.name} onChange={set("name")} /></label>
        <label>Email<input type="email" value={f.email} onChange={set("email")} /></label>
        <label>Phone (10 digits)<input value={f.phone} maxLength={10} onChange={set("phone")} /></label>
        <label>Password<input type="password" value={f.password} onChange={set("password")} /></label>
        <label>Confirm password<input type="password" value={f.confirm} onChange={set("confirm")} /></label>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Sign up</button>
        <span>Already registered? <Link href="/login">Login</Link></span>
      </form>
    </div>
  );
}
