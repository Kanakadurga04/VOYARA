"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { Role, User } from "@/types";
import { load, save } from "@/utils/helpers";

// Demo-only built-in accounts (used by the login pages and the Demo Mode bar)
export const ADMIN: User = { name: "Admin", email: "admin@voyara.com", phone: "9999999999", password: "admin123", role: "admin" };
export const DEMO_USER: User = { name: "Demo User", email: "user@voyara.com", phone: "8888888888", password: "user123", role: "user" };

type SignupInput = { name: string; email: string; phone: string; password: string; confirm: string };
type AuthCtx = {
  ready: boolean;
  user: User | null;
  registered: User[];
  allUsers: User[];
  signup: (v: SignupInput) => string | null;
  login: (email: string, password: string, expected: Role) => string | null;
  loginAs: (email: string) => void;
  logout: () => void;
  deleteUser: (email: string) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [registered, setRegistered] = useState<User[]>([]);
  const [session, setSession] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRegistered(load<User[]>("voyara_users", []));
    setSession(load<string | null>("voyara_session", null));
    setReady(true);
  }, []);
  useEffect(() => { if (ready) save("voyara_users", registered); }, [registered, ready]);
  useEffect(() => { if (ready) save("voyara_session", session); }, [session, ready]);

  const allUsers = [ADMIN, DEMO_USER, ...registered];
  const user = allUsers.find((u) => u.email === session) ?? null;

  const signup = (v: SignupInput) => {
    const email = v.email.trim().toLowerCase();
    if (v.name.trim().length < 2) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address.";
    if (!/^\d{10}$/.test(v.phone)) return "Phone number must be 10 digits.";
    if (v.password.length < 6) return "Password must be at least 6 characters.";
    if (v.password !== v.confirm) return "Passwords do not match.";
    if (allUsers.some((u) => u.email === email)) return "This email is already registered. Please login.";
    setRegistered((p) => [...p, { name: v.name.trim(), email, phone: v.phone, password: v.password, role: "user" }]);
    setSession(email);
    return null;
  };

  const login = (emailIn: string, password: string, expected: Role) => {
    const email = emailIn.trim().toLowerCase();
    const found = allUsers.find((u) => u.email === email && u.password === password);
    if (!found) return "Wrong email or password.";
    if (found.role !== expected)
      return expected === "admin" ? "This is not an admin account." : "This is an admin account. Please use the Admin Login page.";
    setSession(found.email);
    return null;
  };

  const loginAs = (email: string) => setSession(email);
  const logout = () => setSession(null);
  const deleteUser = (email: string) => setRegistered((p) => p.filter((u) => u.email !== email));

  return <Ctx.Provider value={{ ready, user, registered, allUsers, signup, login, loginAs, logout, deleteUser }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
