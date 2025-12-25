"use client";

import { useContext } from "react";

import { WeatherContext } from "../app/context/Weathercontext";




import WeatherCard from "./Weathercard";
import HourlyForecast from "./Hourlyforecast";
import DayForecast from "./Dayforecast";
import "./Animation.css";

export default function LandingPage() {
  const { searchCity } = useContext(WeatherContext);

  return (
    <div className="app weather-container" style={{ minHeight: "100vh" }}>
      <WeatherCard searchCity={searchCity} />
      <HourlyForecast searchCity={searchCity} />
      <DayForecast searchCity={searchCity} />
    </div>
  );
}
