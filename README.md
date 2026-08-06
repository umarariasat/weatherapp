# 🌦️ Weather App

A modern, feature-rich weather application built with **Next.js** that provides real-time weather information, hourly forecasts, 5-day forecasts, air quality data, and location-based weather updates. The application combines a clean, responsive user interface with secure API integration to deliver fast and accurate weather information for users worldwide.

Designed following modern frontend development practices, this project demonstrates component-based architecture, API integration, state management, responsive design, and secure environment configuration.

---

## ✨ Features

### 🌍 Weather Information

* Search weather by city name
* Current weather conditions
* Real-time temperature
* Feels-like temperature
* Weather descriptions and dynamic icons
* Humidity
* Wind speed
* Atmospheric pressure
* Visibility
* UV Index
* Air Quality Index (AQI)
* Sunrise and sunset timings

### 📅 Forecasts

* Hourly weather forecast
* 5-Day weather forecast
* Detailed daily weather information
* Dynamic weather updates

### 📍 Location Services

* Detect user's current location using the Geolocation API
* Display weather for the current location automatically

### ❤️ User Experience

* Responsive design for desktop, tablet, and mobile devices
* Search history
* Smooth animations and loading states
* Comprehensive error handling
* User-friendly interface

### 🔒 Security

* Secure API key management using environment variables
* Protected API requests
* Client-side input validation
* Graceful error handling
* Clean and modular architecture

---

## 🛠️ Technology Stack

| Category         | Technologies                                           |
| ---------------- | ------------------------------------------------------ |
| Framework        | Next.js                                                |
| Language         | TypeScript / JavaScript (ES6+)                         |
| Styling          | Tailwind CSS                                           |
| UI               | React                                                  |
| APIs             | OpenWeatherMap API, Geolocation API                    |
| Data Fetching    | Fetch API                                              |
| State Management | React Hooks                                            |
| Storage          | Local Storage                                          |
| Security         | Environment Variables (`.env.local`), Input Validation |
| Deployment       | Vercel                                                 |

---



## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-app.git
```

### 2. Navigate to the Project

```bash
cd weather-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_WEATHER_API_KEY=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your Weather API key.

### 5. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---


