"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { useData } from "@/context/DataContext";

export default function Home() {
  const { destinations, hotels } = useData();
  const router = useRouter();
  const [dest, setDest] = useState("");

  return (
    <div>
      <section className="hero">
        <h1>Travel for peace, not just satisfaction.</h1>
        <p>Book hotels, transport and complete holiday packages in one place.</p>
        <form className="hero-search" onSubmit={(e) => { e.preventDefault(); router.push(dest ? `/destinations/${dest}` : "/destinations"); }}>
          <select value={dest} onChange={(e) => setDest(e.target.value)}>
            <option value="">Where do you want to go?</option>
            {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button className="btn" type="submit">Explore</button>
        </form>
      </section>
      <div className="page">
        <h2>Popular destinations</h2>
        <div className="grid">
          {destinations.slice(0, 4).map((d) => (
            <Card key={d.id} emoji={d.emoji} title={d.name} meta={d.state} text={d.blurb} href={`/destinations/${d.id}`} cta="Explore" />
          ))}
        </div>
        <h2>Top rated hotels</h2>
        <div className="grid">
          {[...hotels].sort((a, b) => b.rating - a.rating).slice(0, 4).map((h) => (
            <Card key={h.id} emoji={h.emoji} title={h.name} meta={`⭐ ${h.rating}`} price={h.price} unit="/ night" href={`/hotels/${h.id}`} cta="Details" href2={`/booking/hotel/${h.id}`} cta2="Book" />
          ))}
        </div>
        <h2>How it works</h2>
        <div className="grid">
          <div className="info"><h3>1. Sign up</h3><p>Create a free account.</p></div>
          <div className="info"><h3>2. Choose &amp; book</h3><p>Pick a hotel, transport or package.</p></div>
          <div className="info"><h3>3. Pay &amp; manage</h3><p>Pay and manage trips in My Bookings.</p></div>
        </div>
        <p style={{ textAlign: "center", marginTop: 30 }}><Link href="/packages" className="btn dark">See all holiday packages</Link></p>
      </div>
    </div>
  );
}
