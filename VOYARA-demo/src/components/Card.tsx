import Link from "next/link";
import { inr } from "@/utils/helpers";

type Props = {
  emoji: string; title: string; meta?: string; text?: string; price?: number; unit?: string;
  href: string; cta?: string; href2?: string; cta2?: string; extra?: string[];
};

export default function Card({ emoji, title, meta, text, price, unit, href, cta = "View", href2, cta2, extra }: Props) {
  return (
    <div className="card">
      <div className="emoji">{emoji}</div>
      <h3>{title}</h3>
      {meta && <small className="muted">{meta}</small>}
      {text && <p>{text}</p>}
      {extra && <ul className="incl">{extra.map((e) => <li key={e}>✔ {e}</li>)}</ul>}
      {price !== undefined && <p className="price">{inr(price)} <small className="muted">{unit}</small></p>}
      <div className="card-actions">
        <Link href={href} className="btn">{cta}</Link>
        {href2 && <Link href={href2} className="btn dark">{cta2}</Link>}
      </div>
    </div>
  );
}
