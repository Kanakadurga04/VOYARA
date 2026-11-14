"use client";
import { useRouter } from "next/navigation";
import { ADMIN, DEMO_USER, useAuth } from "@/context/AuthContext";

// Live switch between User mode and Admin mode (for presentations).
export default function DemoSwitcher() {
  const { user, loginAs, logout, ready } = useAuth();
  const router = useRouter();
  if (!ready) return null;
  const mode = user ? (user.role === "admin" ? "Admin mode" : "User mode") : "Guest";

  return (
    <div className="demobar">
      <span>🎬 Demo: <strong>{mode}</strong></span>
      <button className="btn small dark" onClick={() => { loginAs(DEMO_USER.email); router.push("/dashboard"); }}>Switch to User</button>
      <button className="btn small red" onClick={() => { loginAs(ADMIN.email); router.push("/admin"); }}>Switch to Admin</button>
      {user && <button className="btn small ghost2" onClick={() => { logout(); router.push("/"); }}>Log out</button>}
    </div>
  );
}
