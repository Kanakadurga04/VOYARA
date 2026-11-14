"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { inr } from "@/utils/helpers";

function Checkout() {
  const { id } = useParams<{ id: string }>();
  const { bookings, updateBooking } = useData();
  const { user } = useAuth();
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState("");
  const [upi, setUpi] = useState("");
  const [error, setError] = useState("");

  const booking = bookings.find((b) => b.id === id && (user?.role === "admin" || b.userEmail === user?.email));

  if (!booking) return <div className="page"><h1>Booking not found</h1><Link href="/my-bookings" className="btn">My bookings</Link></div>;

  if (booking.paid) {
    return (
      <div className="page">
        <div className="success">
          <div className="big-emoji">✅</div>
          <h1>Payment successful</h1>
          <p>Booking <strong>{booking.id}</strong> for {booking.title} is confirmed.</p>
          <p className="total">{inr(booking.total)}</p>
          <Link href="/my-bookings" className="btn">View my bookings</Link>
        </div>
      </div>
    );
  }

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "card" && card.replace(/\s/g, "").length < 12) return setError("Enter a card number with at least 12 digits (demo).");
    if (method === "upi" && !/^[\w.-]+@\w+$/.test(upi)) return setError("Enter a valid UPI id, e.g. name@upi.");
    updateBooking(booking.id, { status: "confirmed", paid: true, method });
  };

  return (
    <div className="page">
      <h1>Checkout</h1>
      <p className="muted">{booking.title} · Booking {booking.id}</p>
      <form className="form" onSubmit={pay}>
        <div className="total">Amount: {inr(booking.total)}</div>
        <label>Payment method
          <select value={method} onChange={(e) => { setMethod(e.target.value); setError(""); }}>
            <option value="card">Card (demo)</option>
            <option value="upi">UPI (demo)</option>
          </select>
        </label>
        {method === "card" ? (
          <label>Card number<input value={card} placeholder="4242 4242 4242 4242" onChange={(e) => setCard(e.target.value)} /></label>
        ) : (
          <label>UPI id<input value={upi} placeholder="name@upi" onChange={(e) => setUpi(e.target.value)} /></label>
        )}
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Pay {inr(booking.total)}</button>
        <small className="muted">This is a demo. No real payment is made.</small>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return <RequireAuth><Checkout /></RequireAuth>;
}
