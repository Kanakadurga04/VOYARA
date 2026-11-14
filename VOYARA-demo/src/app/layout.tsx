import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoSwitcher from "@/components/DemoSwitcher";

export const metadata = { title: "VOYARA – Travel Booking Platform", description: "Hotels, transport and holiday packages" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="main">{children}</main>
          <Footer />
          <DemoSwitcher />
        </Providers>
      </body>
    </html>
  );
}
