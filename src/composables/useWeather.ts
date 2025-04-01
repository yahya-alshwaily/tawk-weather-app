import { ref } from "vue";
import type {
  HourData,
  DayData,
  ForecastResponse,
  CurrentWeatherResponse,
} from "@/types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const forecast = ref<ForecastResponse | null>(null);

export function useWeather() {
  const current = ref<CurrentWeatherResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Unified fetch handler
  async function safeFetch<T>(url: string): Promise<T | null> {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return await res.json();
    } catch (err: any) {
      error.value = err.message || "Something went wrong";
      return null;
    } finally {
      loading.value = false;
    }
  }

  //Current weather by city name
  async function fetchCurrentWeather(city: string) {
    const data = await safeFetch<CurrentWeatherResponse>(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (data) {
      current.value = data;
    }
  }

  // Forecast by city name
  async function fetchForecast(city: string) {
    const data = await safeFetch<ForecastResponse>(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (data) {
      forecast.value = data;
    }
  }

  // Forecast by geolocation
  async function fetchForecastByCoords(lat: number, lon: number) {
    const data = await safeFetch<ForecastResponse>(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (data) {
      forecast.value = data;
    }

    return data; // In case caller needs the result
  }

  // Current weather by geolocation
  async function fetchWeatherByCoords(lat: number, lon: number) {
    const data = await safeFetch<CurrentWeatherResponse>(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (data) {
      current.value = data;
    }
  }

  // Hourly forecast (next 6 entries)
  function getHourlyForecast(): HourData[] {
    if (!forecast.value || !forecast.value.list) return [];

    return forecast.value.list.slice(0, 6).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: Math.round(item.main.temp),
      icon: getIcon(item.weather[0].main),
    }));
  }

  // Daily forecast (1 per day, 5 days)
  function getDailyForecast(): DayData[] {
    if (!forecast.value) return [];

    return forecast.value.list
      .filter((_: any, index: number) => index % 8 === 0)
      .map((item: any) => ({
        day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: getIcon(item.weather[0].main),
      }));
  }

  // Icon mapping
  function getIcon(condition: string): string {
    const map: Record<string, string> = {
      Clear: "sun",
      Clouds: "cloud",
      Rain: "cloud-rain",
      Thunderstorm: "bolt",
      Snow: "snowflake",
      Drizzle: "cloud-showers-heavy",
      Mist: "smog",
    };

    return map[condition] || "cloud";
  }

  return {
    current,
    forecast,
    loading,
    error,
    fetchCurrentWeather,
    fetchForecast,
    fetchWeatherByCoords,
    fetchForecastByCoords,
    getHourlyForecast,
    getDailyForecast,
  };
}
