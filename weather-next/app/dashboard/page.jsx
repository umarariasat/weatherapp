"use client";

import { useState } from "react";
import LandingPage from "../../components/Landinpage";

export default function DashboardPage() {
  const [searchCity, setSearchCity] = useState("London");

  return (
   <div>

      <LandingPage searchCity={searchCity} />
    </div>
  );
}
