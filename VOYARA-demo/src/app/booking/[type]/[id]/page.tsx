"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { packageList, transportList } from "@/lib/data";
import type { Booking } from "@/types";
import { inr, nightsBetween, today } from "@/utils/helpers";

type Item = { id: string; title: string; price: number };

function BookingForm() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const { hotels, addBooking } = useData();
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [date, setDate] = useState(today());
  const [endDate, setEndDate] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  let item: Item | null = null;
  if (type === "hotel") {
    const h = hotels.find((x) => x.id === id);
    if (h) item = { id: h.id, title: h.name, price: h.price };
  } else if (type === "transport") {
    const t = transportList.find((x) => x.id === id);
    if (t) item = { id: t.id, title: `${t.from} → ${t.to}`, price: t.price };
  } else if (type === "package") {
    const p = packageList.find((x) => x.id === id);
    if (p) item = { id: p.id, title: p.title, price: p.price };
  }

  if (!item || !user) return <div className="page"><h1>Item not found</h1><Link href="/" className="btn">Go home</Link></div>;

  const isHotel = type === "hotel";
  const nights = isHotel && endDate > date ? nightsBetween(date, endDate) : 1;
  const total = item.price * (isHotel ? nights * qty : qty);
  const qtyLabel = isHotel ? "Rooms" : type === "transport" ? "Seats" : "Travellers";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (!/^\d{10}$/.test(phone)) return setError("Phone number must be 10 digits.");
    if (date < today()) return setError("Date cannot be in the past.");
    if (isHotel && endDate <= date) return setError("Check-out must be after check-in.");

    const booking: Booking = {
      id: "BK" + Date.now().toString().slice(-8),
      userEmail: user.email,
      type: type as Booking["type"],
      itemId: item.id,
      title: item.title,
      customer: name.trim(),
      phone,
      date,
      endDate: isHotel ? endDate : null,
      qty,
      total,
      status: "pending",
      paid: false,
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    router.push(`/checkout/${booking.id}`);
  };

  return (
    <div className="page">
      <h1>Book: {item.title}</h1>
      <form className="form" onSubmit={submit}>
        <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label>Phone (10 digits)<input value={phone} maxLength={10} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} /></label>
        <label>{isHotel ? "Check-in" : type === "transport" ? "Travel date" : "Start date"}
          <input type="date" min={today()} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        {isHotel && (
          <label>Check-out
            <input type="date" min={date} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
        )}
        <label>{qtyLabel}
          <input type="number" min={1} max={10} value={qty} onChange={(e) => setQty(Math.min(10, Math.max(1, Number(e.target.value) || 1)))} />
        </label>
        <div className="summary">
          {inr(item.price)} × {isHotel ? `${nights} night(s) × ${qty} room(s)` : qty}
          <div className="total">Total: {inr(total)}</div>
        </div>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Continue to payment</button>
      </form>
    </div>
  );
}

export default function BookingPage() {
  return <RequireAuth><BookingForm /></RequireAuth>;
}
