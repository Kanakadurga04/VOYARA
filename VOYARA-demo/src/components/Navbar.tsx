"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links: [string, string][] = [
  ["Destinations", "/destinations"], ["Hotels", "/hotels"], ["Transport", "/transport"], ["Packages", "/packages"],
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const cls = (href: string) => (path.startsWith(href) ? "active" : "");

  return (
    <header className="nav">
      <Link href="/" className="logo">✈ VOYARA</Link>
      <nav className="nav-links">
        {links.map(([t, h]) => <Link key={h} href={h} className={cls(h)}>{t}</Link>)}
        {user && <Link href="/dashboard" className={cls("/dashboard")}>Dashboard</Link>}
        {user && <Link href="/my-bookings" className={cls("/my-bookings")}>My Bookings</Link>}
        {user?.role === "admin" && <Link href="/admin" className={path === "/admin" ? "active" : ""}>Admin Panel</Link>}
      </nav>
      <div className="nav-user">
        {user ? (
          <>
            <span>👤 {user.name} <span className={`badge ${user.role}`}>{user.role}</span></span>
            <button className="btn small" onClick={() => { logout(); router.push("/"); }}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn small ghost">Login</Link>
            <Link href="/signup" className="btn small">Sign up</Link>
            <Link href="/admin/login" className="btn small ghost">Admin</Link>
          </>
        )}
      </div>
    </header>
  );
}
