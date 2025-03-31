const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export async function searchCities(query: string) {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    )
    return await res.json()
  }
