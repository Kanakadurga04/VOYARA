"use client";
import { useState } from "react";
import Card from "@/components/Card";
import { useData } from "@/context/DataContext";

export default function Destinations() {
  const { destinations } = useData();
  const [q, setQ] = useState("");
  const list = destinations.filter((d) => `${d.name} ${d.state}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page">
      <h1>Destinations</h1>
      <p className="muted">Choose a place to see its hotels and packages.</p>
      <div className="filters"><input placeholder="Search destinations…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="grid">
        {list.map((d) => (
          <Card key={d.id} emoji={d.emoji} title={d.name} meta={`${d.state} · Best: ${d.bestTime}`} text={d.blurb} href={`/destinations/${d.id}`} cta="Explore" />
        ))}
      </div>
      {list.length === 0 && <p>No destinations found.</p>}
    </div>
  );
}
