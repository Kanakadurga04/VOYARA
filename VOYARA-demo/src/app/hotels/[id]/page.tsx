"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { inr } from "@/utils/helpers";

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const { hotels, destinations } = useData();
  const h = hotels.find((x) => x.id === id);

  if (!h) return <div className="page"><h1>Hotel not found</h1><Link href="/hotels" className="btn">Back</Link></div>;
  const d = destinations.find((x) => x.id === h.destId);

  return (
    <div className="page">
      <Link href="/hotels" className="back">← All hotels</Link>
      <div className="detail-head">
        <div className="big-emoji">{h.emoji}</div>
        <div>
          <h1>{h.name}</h1>
          <p className="muted">{d ? `${d.name}, ${d.state}` : ""} · ⭐ {h.rating}</p>
          <p>{h.blurb}</p>
          <p className="price">{inr(h.price)} <small className="muted">/ night</small></p>
          <Link href={`/booking/hotel/${h.id}`} className="btn">Book this hotel</Link>
        </div>
      </div>
      <h2>Amenities</h2>
      <div className="chips">{h.amenities.map((a) => <span className="chip" key={a}>✔ {a}</span>)}</div>
    </div>
  );
}
