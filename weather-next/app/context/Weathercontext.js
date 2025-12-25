"use client"; // Required for client-side state

import { createContext, useState } from "react";

// Export the context
export const WeatherContext = createContext();

// Export the provider
export function WeatherProvider({ children }) {
  const [searchCity, setSearchCity] = useState("gujrat");

  // Function to handle city search
  const handleSearch = (city) => {
    setSearchCity(city);
  };

  // Function to handle current location
  const handleCurrentLocation = ({ lat, lon }) => {
    const API_KEY = "2446aa6befab420ae365c88d4e92c5cf";
    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.length > 0 && data[0].name) {
          setSearchCity(data[0].name);
        }
      })
      .catch((err) => console.error("Error fetching location:", err));
  };

  return (
    <WeatherContext.Provider value={{ searchCity, handleSearch, handleCurrentLocation }}>
      {children}
    </WeatherContext.Provider>
  );
}
