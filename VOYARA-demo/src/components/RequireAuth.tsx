"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types";

export default function RequireAuth({ role, children }: { role?: Role; children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const loginPath = role === "admin" ? "/admin/login" : "/login";

  useEffect(() => { if (ready && !user) router.replace(loginPath); }, [ready, user, router, loginPath]);

  if (!ready || !user) return <div className="page"><p className="muted">Checking login…</p></div>;
  if (role && user.role !== role) {
    return (
      <div className="page">
        <h1>Access denied</h1>
        <p className="muted">This page is only for administrators.</p>
        <Link href="/admin/login" className="btn dark">Go to Admin Login</Link>
      </div>
    );
  }
  return <>{children}</>;
}
