"use client";
import { useState } from "react";
import Card from "@/components/Card";
import { transportList } from "@/lib/data";

const icon = { Flight: "✈️", Train: "🚆", Bus: "🚌" } as const;

export default function TransportPage() {
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");
  const list = transportList.filter((t) => (type === "All" || t.type === type) && `${t.from} ${t.to}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page">
      <h1>Transport</h1>
      <p className="muted">Flights, trains and buses.</p>
      <div className="filters">
        <input placeholder="Search city…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>All</option><option>Flight</option><option>Train</option><option>Bus</option>
        </select>
      </div>
      <div className="grid">
        {list.map((t) => (
          <Card key={t.id} emoji={icon[t.type]} title={`${t.from} → ${t.to}`} meta={`${t.type} · departs ${t.time} · ${t.duration}`} price={t.price} unit="/ seat" href={`/booking/transport/${t.id}`} cta="Book" />
        ))}
      </div>
      {list.length === 0 && <p>No routes found.</p>}
    </div>
  );
}
