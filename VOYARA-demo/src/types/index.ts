export type Role = "user" | "admin";
export type User = { name: string; email: string; phone: string; password: string; role: Role };
export type Destination = { id: string; name: string; state: string; emoji: string; bestTime: string; blurb: string };
export type Hotel = { id: string; destId: string; name: string; emoji: string; price: number; rating: number; amenities: string[]; blurb: string };
export type Transport = { id: string; type: "Flight" | "Train" | "Bus"; from: string; to: string; time: string; duration: string; price: number };
export type Pkg = { id: string; destId: string; title: string; emoji: string; days: number; price: number; includes: string[]; blurb: string };
export type BookingType = "hotel" | "transport" | "package";
export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type Booking = {
  id: string; userEmail: string; type: BookingType; itemId: string; title: string;
  customer: string; phone: string; date: string; endDate: string | null; qty: number; total: number;
  status: BookingStatus; paid: boolean; method?: string; createdAt: string;
};
