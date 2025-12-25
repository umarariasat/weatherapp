"use client";

import React, { useState, useEffect, useCallback } from "react";

import "./Animation.css";

export default function Map({ initialCity }) {
  const [iframeSrc, setIframeSrc] = useState(
    "https://embed.windy.com/embed2.html?lat=24.86&lon=67.0&zoom=5&level=surface&overlay=temperature"
  ); 

  // Fetch city coordinates from OpenStreetMap
  const fetchCityCoordinates = useCallback(async (city) => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          city
        )}&format=json&limit=1`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setIframeSrc(
          `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=9&level=surface&overlay=temperature`
        );
      } else {
        console.error(`Location "${city}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch location. Try again.");
    }
  }, []);

  // Update iframe when initialCity changes
  useEffect(() => {
    if (initialCity) {
      fetchCityCoordinates(initialCity);
    }
  }, [initialCity, fetchCityCoordinates]);

  return (
    <div className="weather-container" style={{ padding: "20px" }}>
      <iframe
        key={iframeSrc} // forces re-render if src changes
        src={iframeSrc}
        width="100%"
        height="500px"
        frameBorder="0"
        title="Windy Map"
        style={{ borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
      ></iframe>
    </div>
  );
}
