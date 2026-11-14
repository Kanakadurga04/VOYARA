"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { Booking, Destination, Hotel } from "@/types";
import { baseDestinations, baseHotels } from "@/lib/data";
import { load, save } from "@/utils/helpers";

type DataCtx = {
  ready: boolean;
  bookings: Booking[];
  hotels: Hotel[];
  destinations: Destination[];
  extraHotels: Hotel[];
  extraDestinations: Destination[];
  addBooking: (b: Booking) => void;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  addHotel: (h: Hotel) => void;
  deleteHotel: (id: string) => void;
  addDestination: (d: Destination) => void;
  deleteDestination: (id: string) => void;
};

const Ctx = createContext<DataCtx | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [extraHotels, setExtraHotels] = useState<Hotel[]>([]);
  const [extraDestinations, setExtraDestinations] = useState<Destination[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setBookings(load<Booking[]>("voyara_bookings", []));
    setExtraHotels(load<Hotel[]>("voyara_extra_hotels", []));
    setExtraDestinations(load<Destination[]>("voyara_extra_destinations", []));
    setReady(true);
  }, []);
  useEffect(() => { if (ready) save("voyara_bookings", bookings); }, [bookings, ready]);
  useEffect(() => { if (ready) save("voyara_extra_hotels", extraHotels); }, [extraHotels, ready]);
  useEffect(() => { if (ready) save("voyara_extra_destinations", extraDestinations); }, [extraDestinations, ready]);

  const value: DataCtx = {
    ready,
    bookings,
    hotels: [...baseHotels, ...extraHotels],
    destinations: [...baseDestinations, ...extraDestinations],
    extraHotels,
    extraDestinations,
    addBooking: (b) => setBookings((p) => [b, ...p]),
    updateBooking: (id, patch) => setBookings((p) => p.map((b) => (b.id === id ? { ...b, ...patch } : b))),
    deleteBooking: (id) => setBookings((p) => p.filter((b) => b.id !== id)),
    addHotel: (h) => setExtraHotels((p) => [...p, h]),
    deleteHotel: (id) => setExtraHotels((p) => p.filter((h) => h.id !== id)),
    addDestination: (d) => setExtraDestinations((p) => [...p, d]),
    deleteDestination: (id) => setExtraDestinations((p) => p.filter((d) => d.id !== id)),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useData() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useData must be used inside DataProvider");
  return c;
}
