"use client";

import { useState, useEffect } from "react";

export default function HourlyForecast({ searchCity }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchCity?.trim()) return;

    setLoading(true);
    setError("");

    const API_KEY = "2446aa6befab420ae365c88d4e92c5cf";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&cnt=8&appid=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.list) {
          setHourlyData([]);
          setError("City not found");
          setLoading(false);
          return;
        }

        const hourly = data.list.map((item) => ({
          time: new Date(item.dt_txt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          temp: Math.round(item.main.temp),
          weather: item.weather[0].main,
          icon: item.weather[0].icon,
          wind: Math.round(item.wind.speed * 3.6),
          humidity: item.main.humidity,
        }));

        setHourlyData(hourly);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching hourly forecast");
        setLoading(false);
      });
  }, [searchCity]);

  if (!searchCity) return <p style={{ textAlign: "center", color: "#333" }}>Enter a city to view hourly forecast.</p>;
  if (loading) return <p style={{ textAlign: "center", color: "#333" }}>Loading forecast...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        background: "linear-gradient(-135deg, #5177a9, #6b88b3, #8ca3c3, #a0b3cc, #c9d3df)",
        padding: "20px",
        borderRadius: "14px",
        backdropFilter: "blur(15px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        margin: "20px auto",
        maxWidth: "95%",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#fff",
          textShadow: "0 0 6px rgba(0,0,0,0.6)",
        }}
      >
        Hourly Forecast
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 120px",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              textAlign: "center",
              padding: "15px 10px",
              color: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{hour.time}</div>
            <img
              src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
              alt={hour.weather}
              style={{ width: "40px", height: "40px", marginBottom: "5px" }}
            />
            <div style={{ marginBottom: "5px" }}>{hour.weather}</div>
            <div style={{ marginBottom: "5px" }}>{hour.temp}°C</div>
            <div style={{ marginBottom: "5px" }}>Wind: {hour.wind} km/h</div>
            <div>Humidity: {hour.humidity}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
