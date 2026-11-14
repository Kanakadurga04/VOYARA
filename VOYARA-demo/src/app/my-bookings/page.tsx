"use client";
import { useState } from "react";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { inr } from "@/utils/helpers";

function MyBookings() {
  const { user } = useAuth();
  const { bookings, updateBooking } = useData();
  const [filter, setFilter] = useState("all");
  const mine = bookings.filter((b) => b.userEmail === user?.email && (filter === "all" || b.status === filter));

  return (
    <div className="page">
      <h1>My Bookings</h1>
      <p className="muted">Pay, track and cancel your trips.</p>
      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option><option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option>
        </select>
      </div>
      {mine.length === 0 ? (
        <p>No bookings found. <Link href="/hotels" className="btn dark">Browse hotels</Link></p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Item</th><th>Date</th><th>Qty</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {mine.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.title}</td>
                  <td>{b.date}{b.endDate ? ` → ${b.endDate}` : ""}</td>
                  <td>{b.qty}</td>
                  <td>{inr(b.total)}</td>
                  <td><span className={`tag ${b.status}`}>{b.status}</span> {b.paid ? "💳 paid" : ""}</td>
                  <td>
                    {!b.paid && b.status !== "cancelled" && <Link href={`/checkout/${b.id}`} className="btn small dark">Pay</Link>}{" "}
                    {b.status !== "cancelled" && (
                      <button className="btn small red" onClick={() => { if (window.confirm("Cancel this booking?")) updateBooking(b.id, { status: "cancelled" }); }}>Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function MyBookingsPage() {
  return <RequireAuth><MyBookings /></RequireAuth>;
}
