import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div><strong>✈ VOYARA</strong><p>Travel for peace, not for satisfaction.</p></div>
        <div className="footer-links">
          <Link href="/destinations">Destinations</Link>
          <Link href="/hotels">Hotels</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/transport">Transport</Link>
        </div>
      </div>
      <p className="copy">© 2026 VOYARA. All rights reserved.</p>
    </footer>
  );
}
