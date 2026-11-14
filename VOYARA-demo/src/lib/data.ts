import type { Destination, Hotel, Pkg, Transport } from "@/types";

export const baseDestinations: Destination[] = [
  { id: "goa", name: "Goa", state: "Goa", emoji: "🏖️", bestTime: "Nov – Feb", blurb: "Golden beaches, lively nightlife, Portuguese heritage and fresh seafood." },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", emoji: "🏰", bestTime: "Oct – Mar", blurb: "The Pink City of grand forts, palaces and colourful bazaars." },
  { id: "kerala", name: "Kerala", state: "Kerala", emoji: "🛶", bestTime: "Sep – Mar", blurb: "Peaceful backwaters, tea hills, spices and Ayurveda." },
  { id: "manali", name: "Manali", state: "Himachal Pradesh", emoji: "🏔️", bestTime: "Mar – Jun, Dec – Jan", blurb: "Snow peaks, adventure sports and cool mountain air." },
  { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", emoji: "🪔", bestTime: "Oct – Mar", blurb: "Ancient ghats, evening aarti and spiritual calm on the Ganga." },
  { id: "andaman", name: "Andaman", state: "Andaman & Nicobar", emoji: "🐠", bestTime: "Nov – Apr", blurb: "Crystal-clear water, coral reefs and white sand islands." },
];

export const baseHotels: Hotel[] = [
  { id: "h1", destId: "goa", name: "Sea Breeze Resort", emoji: "🌴", price: 3500, rating: 4.4, amenities: ["Pool", "Beach access", "Breakfast"], blurb: "Beachfront rooms with a pool and sea-view balconies." },
  { id: "h2", destId: "goa", name: "Palm Grove Inn", emoji: "🏨", price: 1800, rating: 4.0, amenities: ["Wi-Fi", "Breakfast"], blurb: "Budget-friendly stay near Calangute beach." },
  { id: "h3", destId: "jaipur", name: "Haveli Palace", emoji: "🏯", price: 2800, rating: 4.6, amenities: ["Heritage rooms", "Rooftop dining", "Wi-Fi"], blurb: "A restored heritage haveli in the old city." },
  { id: "h4", destId: "jaipur", name: "City Stay Suites", emoji: "🛏️", price: 2200, rating: 4.1, amenities: ["Wi-Fi", "AC", "Gym"], blurb: "Modern suites close to the railway station." },
  { id: "h5", destId: "kerala", name: "Backwater Villa", emoji: "🌿", price: 4200, rating: 4.7, amenities: ["Lake view", "Ayurveda spa", "Breakfast"], blurb: "Lake-side villa with boat rides and spa." },
  { id: "h6", destId: "manali", name: "Snow Peak Lodge", emoji: "⛰️", price: 3100, rating: 4.3, amenities: ["Heater", "Valley view", "Breakfast"], blurb: "Cosy wooden lodge with a view of the snow peaks." },
  { id: "h7", destId: "varanasi", name: "Ganga View Residency", emoji: "🛕", price: 2400, rating: 4.2, amenities: ["Ghat view", "Wi-Fi", "AC"], blurb: "Rooms facing the Ganga, five minutes from the main ghat." },
  { id: "h8", destId: "andaman", name: "Coral Bay Resort", emoji: "🐚", price: 5200, rating: 4.8, amenities: ["Private beach", "Diving desk", "Pool"], blurb: "Island resort on a quiet white-sand beach." },
];

export const transportList: Transport[] = [
  { id: "t1", type: "Flight", from: "Hyderabad", to: "Goa", time: "07:30", duration: "1h 25m", price: 4800 },
  { id: "t2", type: "Train", from: "Delhi", to: "Jaipur", time: "06:05", duration: "4h 30m", price: 650 },
  { id: "t3", type: "Bus", from: "Bengaluru", to: "Goa", time: "21:00", duration: "12h", price: 1100 },
  { id: "t4", type: "Flight", from: "Chennai", to: "Kochi", time: "09:15", duration: "1h 10m", price: 3900 },
  { id: "t5", type: "Bus", from: "Delhi", to: "Manali", time: "19:30", duration: "13h", price: 1400 },
  { id: "t6", type: "Train", from: "Mumbai", to: "Goa", time: "23:10", duration: "11h", price: 900 },
  { id: "t7", type: "Flight", from: "Kolkata", to: "Port Blair", time: "10:45", duration: "2h", price: 6200 },
  { id: "t8", type: "Train", from: "Delhi", to: "Varanasi", time: "20:10", duration: "12h", price: 1200 },
];

export const packageList: Pkg[] = [
  { id: "p1", destId: "goa", title: "Goa Getaway", emoji: "🎉", days: 4, price: 14999, includes: ["3 nights hotel", "Breakfast", "Sightseeing", "Airport transfers"], blurb: "Beaches, forts and nightlife in four relaxed days." },
  { id: "p2", destId: "jaipur", title: "Royal Rajasthan", emoji: "👑", days: 3, price: 11999, includes: ["2 nights heritage stay", "City tour", "Local guide"], blurb: "Forts, palaces and bazaars with a guide." },
  { id: "p3", destId: "kerala", title: "Kerala Backwaters", emoji: "🛶", days: 5, price: 19999, includes: ["4 nights stay", "Houseboat night", "Tea estate visit"], blurb: "Houseboat, tea gardens and Ayurveda." },
  { id: "p4", destId: "manali", title: "Manali Snow Trip", emoji: "❄️", days: 5, price: 17999, includes: ["4 nights stay", "Solang Valley", "Transfers"], blurb: "Snow, adventure sports and mountain views." },
  { id: "p5", destId: "varanasi", title: "Spiritual Varanasi", emoji: "🪔", days: 3, price: 9999, includes: ["2 nights stay", "Ganga aarti", "Boat ride"], blurb: "Ghats, temples and the evening aarti." },
  { id: "p6", destId: "andaman", title: "Andaman Islands", emoji: "🏝️", days: 6, price: 32999, includes: ["5 nights resort", "Island hopping", "Snorkelling"], blurb: "Beaches, coral and island hopping." },
];
