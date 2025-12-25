"use client"; // Required for client-side hooks like useState and useRouter

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header({ onSearch, onCurrentLocation }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [city, setCity] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("bgImage");
    router.push("/login"); // Redirect after logout
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  const handleCurrentLocation = () => {
    if (onCurrentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            onCurrentLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
            alert(
              "Could not retrieve your location. Please ensure location services are enabled."
            );
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        padding: "10px",
        background: "#57769f73",
        color: "white",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            padding: "5px",
            color: "#00bfff",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.target.style.color = "#00bfff")}
        >
          The Lume
        </h1>

        <div
          style={{
            width: "45%",
            padding: "5px",
            display: "flex",
            gap: "5px",
          }}
        >
          <style>{`
            input::placeholder {
              color: white;
              opacity: 1;
            }
          `}</style>
          <input
            style={{
              width: "90%",
              padding: "8px 10px",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.border = "1px solid #00bfff";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.border = "1px solid rgba(255,255,255,0.2)";
            }}
            type="text"
            placeholder="Search a City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            style={{
              height: "5.5vh",
              width: "10%",
              background: "#00bfff",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
            }}
            onClick={handleSearch}
            onMouseEnter={(e) => {
              e.target.style.background = "#009fd9";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#00bfff";
              e.target.style.transform = "scale(1)";
            }}
          >
            🔍
          </button>
        </div>

        <button
          style={{
            padding: "8px 14px",
            fontSize: "1rem",
            background: "#00bfff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#009fd9";
            e.target.style.transform = "scale(1.05)";
          }}
          onClick={handleCurrentLocation}
          onMouseLeave={(e) => {
            e.target.style.background = "#00bfff";
            e.target.style.transform = "scale(1)";
          }}
        >
          Current location
        </button>
      </div>

      <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            padding: "5px",
            display: "flex",
            gap: "20px",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Link href="/" style={{ padding: "5px", color: "white", fontWeight: "500", textDecoration: "none" }}>Home</Link>
          <Link href="/dashboard" style={{ padding: "5px", color: "white", fontWeight: "500", textDecoration: "none" }}>Dashboard</Link>

          <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              style={{
                fontSize: "16px",
                padding: "5px",
                color: "white",
                backgroundColor: "transparent",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Services ▼
            </button>
            {open && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "rgba(20,20,20,0.95)",
                  borderRadius: "10px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "170px",
                  zIndex: 999999,
                }}
              >
                {[
                  { name: "All Services", to: "/services" },
                  { name: "Live Map", to: "/MapService" },
                  { name: "Clothing Suggestions", to: "/ClothingSuggestions" },
                  { name: "Air Quality Index", to: "/AirQualityIndex" },
                ].map((item) => (
                  <Link key={item.to} href={item.to} style={{ padding: "8px 12px", color: "white", textDecoration: "none", fontWeight: "500" }}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" style={{ padding: "5px", color: "white", fontWeight: "500", textDecoration: "none" }}>About us</Link>
          <Link href="/contact" style={{ padding: "5px", color: "white", fontWeight: "500", textDecoration: "none" }}>Contact us</Link>
          <Link href="/termANDconditions" style={{ padding: "5px", color: "white", fontWeight: "500", textDecoration: "none" }}>Term & Conditions</Link>
        </div>

        <div
          style={{
            padding: "5px",
            display: "flex",
            gap: "20px",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}
          >
            <button
              style={{
                fontSize: "16px",
                padding: "5px",
                color: "white",
                backgroundColor: "transparent",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Menu ▼
            </button>

            {openMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "rgba(20,20,20,0.95)",
                  borderRadius: "10px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "170px",
                  zIndex: 999999,
                }}
              >
                <Link href="/changepassword" style={{ padding: "8px 12px", color: "white", fontWeight: "500", textDecoration: "none", fontSize: "13px" }}>Change Password</Link>
                <Link href="/changeusername" style={{ padding: "8px 12px", color: "white", fontWeight: "500", textDecoration: "none", fontSize: "13px" }}>Change Username</Link>
                <Link href="/deleteaccount" style={{ padding: "8px 12px", color: "white", fontWeight: "500", textDecoration: "none", fontSize: "13px" }}>Delete Account</Link>
                <button onClick={handleLogout} style={{ padding: "8px 12px", color: "white", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>Logout</button>
              </div>
            )}
          </div>

          <Link href="/register" style={{ padding: "5px", color: "white", fontWeight: "500", textDecoration: "none" }}>Register</Link>
          <Link href="/login" style={{ padding: "5px", color: "white", fontWeight: "500", textDecoration: "none" }}>Login</Link>
        </div>
      </div>
    </div>
  );
}
