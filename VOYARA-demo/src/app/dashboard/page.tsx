"use client";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { inr, today } from "@/utils/helpers";

function UserDashboard() {
  const { user } = useAuth();
  const { bookings } = useData();
  const mine = bookings.filter((b) => b.userEmail === user?.email);
  const spent = mine.filter((b) => b.paid && b.status !== "cancelled").reduce((s, b) => s + b.total, 0);
  const upcoming = mine
    .filter((b) => b.status !== "cancelled" && b.date >= today())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const pendingPay = mine.filter((b) => !b.paid && b.status !== "cancelled").length;

  return (
    <div className="page">
      <h1>Welcome, {user?.name} 👋</h1>
      <p className="muted">{user?.email} · {user?.role === "admin" ? "Administrator" : "Traveller"}</p>

      <div className="stats">
        <div className="stat"><b>{mine.length}</b>Total bookings</div>
        <div className="stat"><b>{mine.filter((b) => b.status === "confirmed").length}</b>Confirmed</div>
        <div className="stat"><b>{pendingPay}</b>Awaiting payment</div>
        <div className="stat"><b>{inr(spent)}</b>Total spent</div>
      </div>

      <h2>Quick actions</h2>
      <div className="grid">
        <Link href="/hotels" className="info"><h3>🏨 Hotels</h3><p>Find a place to stay.</p></Link>
        <Link href="/transport" className="info"><h3>🚆 Transport</h3><p>Flights, trains and buses.</p></Link>
        <Link href="/packages" className="info"><h3>🎒 Packages</h3><p>Complete holiday deals.</p></Link>
        <Link href="/my-bookings" className="info"><h3>📋 My Bookings</h3><p>View, pay or cancel.</p></Link>
      </div>

      <h2>Upcoming trips</h2>
      {upcoming.length === 0 ? (
        <p className="muted">No upcoming trips. <Link href="/destinations" className="back">Explore destinations</Link></p>
      ) : (
        <div className="grid">
          {upcoming.map((b) => (
            <div className="info" key={b.id}>
              <h3>{b.title}</h3>
              <p>{b.date}{b.endDate ? ` → ${b.endDate}` : ""}</p>
              <span className={`tag ${b.status}`}>{b.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return <RequireAuth><UserDashboard /></RequireAuth>;
}
