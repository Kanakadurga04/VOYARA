"use client";
import { useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import { ADMIN, DEMO_USER, useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { inr } from "@/utils/helpers";

const TABS = ["Overview", "Bookings", "Hotels", "Destinations", "Users"] as const;
type Tab = (typeof TABS)[number];

function AdminPanel() {
  const { allUsers, registered, deleteUser } = useAuth();
  const { bookings, hotels, destinations, extraHotels, extraDestinations, updateBooking, deleteBooking, addHotel, deleteHotel, addDestination, deleteDestination } = useData();
  const [tab, setTab] = useState<Tab>("Overview");
  const [hotelForm, setHotelForm] = useState({ name: "", price: "", destId: "goa" });
  const [destForm, setDestForm] = useState({ name: "", state: "", blurb: "" });
  const [msg, setMsg] = useState("");

  const revenue = bookings.filter((b) => b.paid && b.status !== "cancelled").reduce((s, b) => s + b.total, 0);

  const submitHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (hotelForm.name.trim().length < 2 || Number(hotelForm.price) <= 0) return setMsg("Enter a hotel name and a price above 0.");
    addHotel({ id: "x" + Date.now(), destId: hotelForm.destId, name: hotelForm.name.trim(), emoji: "🏨", price: Number(hotelForm.price), rating: 4.0, amenities: ["Wi-Fi", "AC"], blurb: "Newly added hotel." });
    setHotelForm({ name: "", price: "", destId: hotelForm.destId });
    setMsg("Hotel added. It now shows on the Hotels page.");
  };

  const submitDest = (e: React.FormEvent) => {
    e.preventDefault();
    if (destForm.name.trim().length < 2 || destForm.state.trim().length < 2) return setMsg("Enter a destination name and state.");
    addDestination({ id: "d" + Date.now(), name: destForm.name.trim(), state: destForm.state.trim(), emoji: "📍", bestTime: "All year", blurb: destForm.blurb.trim() || "Newly added destination." });
    setDestForm({ name: "", state: "", blurb: "" });
    setMsg("Destination added. It now shows on the Destinations page.");
  };

  return (
    <div className="page">
      <h1>Admin Panel</h1>
      <p className="muted">Manage bookings, hotels, destinations and users.</p>

      <div className="tabs">
        {TABS.map((t) => <button key={t} className={`tab ${tab === t ? "on" : ""}`} onClick={() => { setTab(t); setMsg(""); }}>{t}</button>)}
      </div>

      {tab === "Overview" && (
        <>
          <div className="stats">
            <div className="stat"><b>{bookings.length}</b>Total bookings</div>
            <div className="stat"><b>{inr(revenue)}</b>Revenue (paid)</div>
            <div className="stat"><b>{bookings.filter((b) => b.status === "pending").length}</b>Pending bookings</div>
            <div className="stat"><b>{hotels.length}</b>Hotels</div>
            <div className="stat"><b>{destinations.length}</b>Destinations</div>
            <div className="stat"><b>{allUsers.length}</b>Users &amp; admins</div>
          </div>
          <h2>What can an admin do?</h2>
          <ul className="cando">
            <li>✅ See total bookings, revenue, pending bookings and user counts.</li>
            <li>✅ <strong>Bookings:</strong> view every customer&apos;s booking, confirm, cancel or delete it.</li>
            <li>✅ <strong>Hotels:</strong> add new hotels and delete the ones added by the admin.</li>
            <li>✅ <strong>Destinations:</strong> add new destinations and delete the ones added by the admin.</li>
            <li>✅ <strong>Users:</strong> view all registered users and remove a user.</li>
            <li>🔒 Only the admin account can open this panel. Normal users see &quot;Access denied&quot;.</li>
          </ul>
        </>
      )}

      {tab === "Bookings" && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Customer</th><th>Item</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.customer}<br /><small className="muted">{b.userEmail}</small></td>
                  <td>{b.title}</td>
                  <td>{b.date}{b.endDate ? ` → ${b.endDate}` : ""}</td>
                  <td>{inr(b.total)}</td>
                  <td><span className={`tag ${b.status}`}>{b.status}</span> {b.paid ? "💳" : ""}</td>
                  <td>
                    <button className="btn small dark" onClick={() => updateBooking(b.id, { status: "confirmed" })}>Confirm</button>{" "}
                    <button className="btn small" onClick={() => updateBooking(b.id, { status: "cancelled" })}>Cancel</button>{" "}
                    <button className="btn small red" onClick={() => { if (window.confirm("Delete this booking?")) deleteBooking(b.id); }}>Delete</button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && <tr><td colSpan={7}>No bookings yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Hotels" && (
        <>
          <form className="form" onSubmit={submitHotel}>
            <label>Hotel name<input value={hotelForm.name} onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })} /></label>
            <label>Price per night (₹)<input type="number" value={hotelForm.price} onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })} /></label>
            <label>Destination
              <select value={hotelForm.destId} onChange={(e) => setHotelForm({ ...hotelForm, destId: e.target.value })}>
                {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </label>
            {msg && <div className="muted">{msg}</div>}
            <button className="btn dark" type="submit">Add hotel</button>
          </form>
          <h3>Hotels added by admin</h3>
          <div className="chips">
            {extraHotels.map((h) => <span className="chip" key={h.id}>{h.name} ({inr(h.price)}) <button className="x" onClick={() => deleteHotel(h.id)}>✕</button></span>)}
            {extraHotels.length === 0 && <span className="muted">None yet.</span>}
          </div>
        </>
      )}

      {tab === "Destinations" && (
        <>
          <form className="form" onSubmit={submitDest}>
            <label>Destination name<input value={destForm.name} onChange={(e) => setDestForm({ ...destForm, name: e.target.value })} /></label>
            <label>State<input value={destForm.state} onChange={(e) => setDestForm({ ...destForm, state: e.target.value })} /></label>
            <label>Short description<textarea rows={3} value={destForm.blurb} onChange={(e) => setDestForm({ ...destForm, blurb: e.target.value })} /></label>
            {msg && <div className="muted">{msg}</div>}
            <button className="btn dark" type="submit">Add destination</button>
          </form>
          <h3>Destinations added by admin</h3>
          <div className="chips">
            {extraDestinations.map((d) => <span className="chip" key={d.id}>{d.name}, {d.state} <button className="x" onClick={() => deleteDestination(d.id)}>✕</button></span>)}
            {extraDestinations.length === 0 && <span className="muted">None yet.</span>}
          </div>
        </>
      )}

      {tab === "Users" && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Bookings</th><th>Action</th></tr></thead>
            <tbody>
              {allUsers.map((u) => {
                const builtIn = u.email === ADMIN.email || u.email === DEMO_USER.email;
                return (
                  <tr key={u.email}>
                    <td>{u.name}</td><td>{u.email}</td><td>{u.phone}</td>
                    <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                    <td>{bookings.filter((b) => b.userEmail === u.email).length}</td>
                    <td>
                      {builtIn || !registered.some((r) => r.email === u.email)
                        ? <small className="muted">built-in</small>
                        : <button className="btn small red" onClick={() => { if (window.confirm(`Remove ${u.name}?`)) deleteUser(u.email); }}>Remove</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return <RequireAuth role="admin"><AdminPanel /></RequireAuth>;
}
