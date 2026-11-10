import React, { useState } from "react";
import "./App.css";

const destinations = [
  { name: "Goa", state: "Goa", emoji: "🏖️", description: "Golden beaches, nightlife and beautiful sunsets." },
  { name: "Jaipur", state: "Rajasthan", emoji: "🏰", description: "Explore royal palaces, forts and colourful markets." },
  { name: "Kerala", state: "Kerala", emoji: "🌴", description: "Peaceful backwaters, tea gardens and nature." },
  { name: "Manali", state: "Himachal Pradesh", emoji: "🏔️", description: "Snow mountains, adventure and cool weather." }
];

const hotels = [
  { name: "Coral Bay Resort", rating: "4.8", price: "₹5,200", emoji: "🏝️" },
  { name: "Backwater Villa", rating: "4.7", price: "₹4,200", emoji: "🌿" },
  { name: "Haveli Palace", rating: "4.6", price: "₹2,800", emoji: "🏯" },
  { name: "Sea Breeze Resort", rating: "4.4", price: "₹3,500", emoji: "🌴" }
];

export default function App() {
  const [page, setPage] = useState("home");
  const [destination, setDestination] = useState("Goa");
  const [user, setUser] = useState(
    localStorage.getItem("voyaraUser") || ""
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function signup(e) {
    e.preventDefault();

    const account = { name, email, password };
    localStorage.setItem("voyaraAccount", JSON.stringify(account));
    localStorage.setItem("voyaraUser", name);

    setUser(name);
    setMessage("Account created successfully!");
    setPage("dashboard");
  }

  function login(e) {
    e.preventDefault();

    const saved = JSON.parse(
      localStorage.getItem("voyaraAccount") || "null"
    );

    if (saved && saved.email === email && saved.password === password) {
      localStorage.setItem("voyaraUser", saved.name);
      setUser(saved.name);
      setPage("dashboard");
      setMessage("");
    } else {
      setMessage("Account not found. Please sign up first or check your details.");
    }
  }

  function logout() {
    localStorage.removeItem("voyaraUser");
    setUser("");
    setPage("home");
    setMessage("You have logged out.");
  }

  function bookHotel(hotel) {
    if (!user) {
      setMessage("Please login before booking.");
      setPage("login");
      return;
    }

    const booking = {
      hotel,
      destination,
      date: new Date().toLocaleDateString()
    };

    const bookings = JSON.parse(
      localStorage.getItem("voyaraBookings") || "[]"
    );

    bookings.push(booking);
    localStorage.setItem("voyaraBookings", JSON.stringify(bookings));

    setMessage("Your demo booking was saved successfully!");
    setPage("dashboard");
  }

  return (
    <div className="voyara">

      <header className="navbar">
        <h2 className="logo" onClick={() => setPage("home")}>
          ✈ VOYARA
        </h2>

        <nav>
          <button onClick={() => setPage("destinations")}>Destinations</button>
          <button onClick={() => setPage("hotels")}>Hotels</button>
          <button onClick={() => setPage("transport")}>Transport</button>
          <button onClick={() => setPage("packages")}>Packages</button>
          <button onClick={() => setPage("about")}>About</button>
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <button className="login-btn" onClick={() => setPage("dashboard")}>
                Dashboard
              </button>
              <button className="signup-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => {
                setMessage("");
                setPage("login");
              }}>Login</button>

              <button className="signup-btn" onClick={() => {
                setMessage("");
                setPage("signup");
              }}>Sign up</button>
            </>
          )}
        </div>
      </header>

      {message && (
        <div className="message">
          {message}
          <button onClick={() => setMessage("")}>✕</button>
        </div>
      )}

      {page === "home" && (
        <>
          <section className="hero">
            <h1>Travel for peace, not just satisfaction.</h1>
            <p>
              Book hotels, transport and complete holiday packages in one place.
            </p>

            <div className="search-box">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                {destinations.map((d) => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>

              <button onClick={() => setPage("hotels")}>
                Find hotels
              </button>
            </div>
          </section>

          <section className="section">
            <h2>Popular destinations</h2>
            <div className="grid">
              {destinations.map((d) => (
                <div className="card" key={d.name}>
                  <div className="emoji">{d.emoji}</div>
                  <h3>{d.name}</h3>
                  <small>{d.state}</small>
                  <p>{d.description}</p>
                  <button onClick={() => {
                    setDestination(d.name);
                    setPage("hotels");
                  }}>Explore</button>
                </div>
              ))}
            </div>
          </section>

          <HotelSection bookHotel={bookHotel} />
        </>
      )}

      {page === "destinations" && (
        <section className="section">
          <h1>Explore Destinations</h1>
          <div className="grid">
            {destinations.map((d) => (
              <div className="card" key={d.name}>
                <div className="emoji">{d.emoji}</div>
                <h3>{d.name}</h3>
                <p>{d.description}</p>
                <button onClick={() => {
                  setDestination(d.name);
                  setPage("hotels");
                }}>Explore hotels</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === "hotels" && (
        <section className="section">
          <h1>Hotels in {destination}</h1>
          <p>Choose your favourite hotel for your holiday.</p>
          <HotelSection bookHotel={bookHotel} />
        </section>
      )}

      {page === "login" && (
        <section className="form-container">
          <h1>Welcome Back!</h1>
          <p>Login to your VOYARA account</p>

          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          <p>Don't have an account?
            <span onClick={() => {
              setMessage("");
              setPage("signup");
            }}> Sign up</span>
          </p>
        </section>
      )}

      {page === "signup" && (
        <section className="form-container">
          <h1>Create Account</h1>
          <p>Join VOYARA and start travelling!</p>

          <form onSubmit={signup}>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Create password (minimum 6 characters)"
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Create Account</button>
          </form>

          <p>Already have an account?
            <span onClick={() => {
              setMessage("");
              setPage("login");
            }}> Login</span>
          </p>
        </section>
      )}

      {page === "dashboard" && (
        <section className="section">
          <div className="dashboard">
            <h1>Welcome, {user}!</h1>
            <p>Your VOYARA travel dashboard.</p>
            <h2>My Bookings</h2>

            {JSON.parse(localStorage.getItem("voyaraBookings") || "[]")
              .map((b, i) => (
                <div className="booking" key={i}>
                  <h3>{b.hotel}</h3>
                  <p>Destination: {b.destination}</p>
                  <p>Booking date: {b.date}</p>
                </div>
              ))}

            <button onClick={() => setPage("destinations")}>
              Explore destinations
            </button>
          </div>
        </section>
      )}

      {page === "transport" && (
        <section className="section">
          <h1>Travel Transport</h1>
          <div className="grid">
            <div className="card"><div className="emoji">✈️</div><h3>Flights</h3><p>Plan your flight journey.</p></div>
            <div className="card"><div className="emoji">🚆</div><h3>Trains</h3><p>Explore train travel options.</p></div>
            <div className="card"><div className="emoji">🚌</div><h3>Buses</h3><p>Find bus travel options.</p></div>
          </div>
        </section>
      )}

      {page === "packages" && (
        <section className="section">
          <h1>Holiday Packages</h1>
          <div className="grid">
            <div className="card"><div className="emoji">🌊</div><h3>Goa Package</h3><p>3 days / 2 nights</p><h3>₹8,999</h3></div>
            <div className="card"><div className="emoji">🏔️</div><h3>Manali Package</h3><p>5 days / 4 nights</p><h3>₹14,999</h3></div>
            <div className="card"><div className="emoji">🌴</div><h3>Kerala Package</h3><p>4 days / 3 nights</p><h3>₹11,999</h3></div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="section about">
          <h1>About VOYARA</h1>
          <p>
            VOYARA is an online travel booking platform designed to help
            travellers explore destinations, discover hotels and plan
            memorable holidays in one place.
          </p>
          <h2>Travel for peace, not just satisfaction.</h2>
        </section>
      )}

      <footer>
        <h2>✈ VOYARA</h2>
        <p>Your journey, our destination.</p>
        <p>© 2026 VOYARA Travel Booking Platform</p>
      </footer>

    </div>
  );
}

function HotelSection({ bookHotel }) {
  return (
    <section className="section">
      <h2>Top rated hotels</h2>
      <div className="grid">
        {hotels.map((h) => (
          <div className="card" key={h.name}>
            <div className="emoji">{h.emoji}</div>
            <h3>{h.name}</h3>
            <p>⭐ {h.rating}</p>
            <h3 className="price">{h.price} / night</h3>
            <button onClick={() => bookHotel(h.name)}>Book</button>
          </div>
        ))}
      </div>
    </section>
  );
}