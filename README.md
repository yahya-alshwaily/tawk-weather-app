
# 🌤️ Vue Weather App

A responsive weather application built with **Vue 3**, **TypeScript**, and the **OpenWeatherMap API**. The app provides real-time and forecasted weather, supports geolocation, search functionality, and maintains selected cities persistently using local storage.

## 🛠 Installation Instructions

# 1. Clone the repository
git clone https://github.com/yahya-alshwaily/tawk-weather-app.git
cd tawk-weather-spa

# 2. Install dependencies
npm install

# 3. Create an .env file (see below)

# 4. Run the development server
npm run dev

## 🌐 Environment Variables

Create a `.env` file in the root and include your OpenWeatherMap API key:

```
```bash
.env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Get a free API key at: [https://openweathermap.org/api](https://openweathermap.org/api)

---

## 🧱 Architecture & Structure

This project uses a **modular, component-based architecture** inspired by Atomic Design.

### Key Concepts

| Layer      | Description                                   |
|------------|-----------------------------------------------|
| `common/`  | Reusable base components (e.g. icons) |
| `weather/` | Weather-specific components (cards, forecasts) |
| `composables/` | Reusable logic using the Composition API      |
| `types/`   | Centralized TypeScript types                  |

### Routing

- `/` – Home view (current & saved cities)
- `/detail/:city` – Detailed weather & forecasts
- `/profile` – User profile management

---

## 📦 State Management

- **Composition API** is used for centralized weather and city list logic (`useWeather.ts`, `useWeatherList.ts`).
- Persistent state via `localStorage` (cities & profile).
- Search uses composables for isolated API interactions.

---

## 🎨 Styling & Responsiveness

- Fully responsive layout for mobile and tablet.
- Layout powered by **Flexbox** and **Grid**.
- Consistent design system and color palette.
- Weather cards feature dynamic background images based on condition.
- Font: System UI / Fallback stack (can be extended to use custom fonts).

---

## ♿ Accessibility & UX

- Semantic HTML5 elements.
- Color contrast validated for text over images.
- Smooth keyboard navigation & focus management.

---

## ✅ Features

- [x] Live current weather
- [x] 5-day forecast (hourly + daily)
- [x] City search with autocomplete
- [x] Geolocation support
- [x] Add/remove favorite cities
- [x] Profile management
- [x] Persistent local storage
- [x] Graceful API error handling
- [x] Dynamic backgrounds
- [x] Fully responsive UI

---

## 📂 Folder Structure

```
src/
├── assets/            # Images and static assets
├── components/
│   ├── common/        # Atoms (e.g., BaseIcon)
│   ├── layout/        # Organisms (e.g., WeatherHeader)
│   ├── search/        # Molecules (e.g., SearchBar)
│   ├── weather/       # Forecast, WeatherCard, etc.
│   ├── views/         # Home, Profile, Detail pages
├── composables/       # Composition API logic
├── types/             # Centralized TypeScript types
├── router/            # Route definitions
└── App.vue
```

---

## 💡 Architectural Decisions

- **Atomic Design** naming replaced with feature-based folders (e.g., `weather`, `search`, `layout`).
- Custom composables for logic separation (`useWeather`, `useCitySearch`, `useWeatherList`).
- TypeScript enforced across all components.
- Performance considerations:
  - Lazy-loaded routes and components.
  - Optimized image assets and background handling.

