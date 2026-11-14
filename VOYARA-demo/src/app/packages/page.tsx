"use client";
import { useState } from "react";
import Card from "@/components/Card";
import { useData } from "@/context/DataContext";
import { packageList } from "@/lib/data";

export default function Packages() {
  const { destinations } = useData();
  const [dest, setDest] = useState("all");
  const list = packageList.filter((p) => dest === "all" || p.destId === dest);
  return (
    <div className="page">
      <h1>Holiday Packages</h1>
      <p className="muted">All-in-one trips with stay, sightseeing and transfers.</p>
      <div className="filters">
        <select value={dest} onChange={(e) => setDest(e.target.value)}>
          <option value="all">All destinations</option>
          {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
      <div className="grid">
        {list.map((p) => (
          <Card key={p.id} emoji={p.emoji} title={p.title} meta={`${p.days} days`} text={p.blurb} extra={p.includes} price={p.price} unit="/ person" href={`/booking/package/${p.id}`} cta="Book" />
        ))}
      </div>
    </div>
  );
}
