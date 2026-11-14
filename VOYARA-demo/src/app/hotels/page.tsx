"use client";
import { useState } from "react";
import Card from "@/components/Card";
import { useData } from "@/context/DataContext";

export default function Hotels() {
  const { hotels, destinations } = useData();
  const [q, setQ] = useState("");
  const [dest, setDest] = useState("all");
  const [sort, setSort] = useState("rating");

  const list = hotels
    .filter((h) => (dest === "all" || h.destId === dest) && h.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (sort === "price" ? a.price - b.price : b.rating - a.rating));

  return (
    <div className="page">
      <h1>Hotels</h1>
      <p className="muted">Search, filter and sort stays.</p>
      <div className="filters">
        <input placeholder="Search hotels…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={dest} onChange={(e) => setDest(e.target.value)}>
          <option value="all">All destinations</option>
          {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Top rated</option>
          <option value="price">Lowest price</option>
        </select>
      </div>
      <div className="grid">
        {list.map((h) => (
          <Card key={h.id} emoji={h.emoji} title={h.name} meta={`⭐ ${h.rating}`} text={h.blurb} price={h.price} unit="/ night" href={`/hotels/${h.id}`} cta="Details" href2={`/booking/hotel/${h.id}`} cta2="Book" />
        ))}
      </div>
      {list.length === 0 && <p>No hotels match your search.</p>}
    </div>
  );
}
