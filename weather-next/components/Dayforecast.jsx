"use client";

import { useState, useEffect } from "react";

export default function DayForecast({ searchCity }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!searchCity?.trim()) return;

    const API_KEY = "2446aa6befab420ae365c88d4e92c5cf";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&cnt=40&appid=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.list) return;

        const daily = data.list
          .filter((item) => item.dt_txt.includes("12:00:00"))
          .slice(0, 5)
          .map((item) => ({
            date: new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
            }),
            temp: Math.round(item.main.temp),
            weather: item.weather[0].main,
            icon: item.weather[0].icon,
          }));

        setForecast(daily);
      })
      .catch((err) => console.error("Error fetching forecast:", err));
  }, [searchCity]);

  if (!forecast.length) return null;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        width: "95%",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(-135deg, #57769fff, #6b88b3, #8ca3c3, #a0b3cc, #c9d3df)",
          padding: "20px",
          borderRadius: "14px",
          backdropFilter: "blur(15px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          width: "100%",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#fff",
            textAlign: "center",
            textShadow: "0 0 6px rgba(0,0,0,0.6)",
          }}
        >
          5-Day Forecast for {searchCity}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {forecast.map((day, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                borderRadius: "12px",
                padding: "15px 20px",
                color: "#fff",
                WebkitTextStroke: "0.3px rgba(0,0,0,0.4)",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontWeight: "bold" }}>{day.date}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                  alt={day.weather}
                  style={{ width: "50px", height: "50px" }}
                />
                <div style={{ textAlign: "right" }}>
                  <div>{day.weather}</div>
                  <div>Temp: {day.temp}°C</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
