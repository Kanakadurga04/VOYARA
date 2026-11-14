"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import Card from "@/components/Card";
import { useData } from "@/context/DataContext";
import { packageList } from "@/lib/data";

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const { destinations, hotels } = useData();
  const d = destinations.find((x) => x.id === id);

  if (!d) return <div className="page"><h1>Destination not found</h1><Link href="/destinations" className="btn">Back</Link></div>;

  const dHotels = hotels.filter((h) => h.destId === id);
  const dPackages = packageList.filter((p) => p.destId === id);

  return (
    <div className="page">
      <Link href="/destinations" className="back">← All destinations</Link>
      <div className="detail-head">
        <div className="big-emoji">{d.emoji}</div>
        <div>
          <h1>{d.name}</h1>
          <p className="muted">{d.state} · Best time: {d.bestTime}</p>
          <p>{d.blurb}</p>
        </div>
      </div>
      <h2>Hotels in {d.name}</h2>
      <div className="grid">
        {dHotels.map((h) => (
          <Card key={h.id} emoji={h.emoji} title={h.name} meta={`⭐ ${h.rating}`} price={h.price} unit="/ night" href={`/hotels/${h.id}`} cta="Details" href2={`/booking/hotel/${h.id}`} cta2="Book" />
        ))}
      </div>
      {dHotels.length === 0 && <p>No hotels listed yet.</p>}
      <h2>Packages</h2>
      <div className="grid">
        {dPackages.map((p) => (
          <Card key={p.id} emoji={p.emoji} title={p.title} meta={`${p.days} days`} text={p.blurb} price={p.price} unit="/ person" href={`/booking/package/${p.id}`} cta="Book" />
        ))}
      </div>
      {dPackages.length === 0 && <p>No packages listed yet.</p>}
    </div>
  );
}
