// app/layout.jsx
import "./globals.css";

import { WeatherProvider } from "./context/Weathercontext"; // adjust if context is inside app/context
import Header from "../components/Header"; // assuming components folder is outside app
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WeatherProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </WeatherProvider>
      </body>
    </html>
  );
}
