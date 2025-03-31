import { ref } from 'vue'
import type { HourData, DayData, ForecastResponse, CurrentWeatherResponse} from '@/types/weather'


const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const forecast = ref<ForecastResponse | null>(null)

export function useWeather() {
  const current = ref<CurrentWeatherResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCurrentWeather(city: string) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      if (!res.ok) throw new Error('City not found')
      current.value = await res.json()
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchForecastByCoords(lat: number, lon: number) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      if (!res.ok) throw new Error('Could not fetch forecast')
      const data = await res.json()
      forecast.value = data
      return data
    } catch (err: any) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchWeatherByCoords(lat: number, lon: number) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      if (!res.ok) throw new Error('Location not found')
      current.value = await res.json()
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchForecast(city: string) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      if (!res.ok) throw new Error('Could not fetch forecast')
      forecast.value = await res.json()
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function getHourlyForecast(): HourData[] {
    if (!forecast.value || !forecast.value.list) return []
    return forecast.value.list.slice(0, 6).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: Math.round(item.main.temp),
      icon: getIcon(item.weather[0].main)
    }))
  }
  
  function getDailyForecast(): DayData[] {
    if (!forecast.value) return []
  
    return forecast.value.list
      .filter((_: any, index: number) => index % 8 === 0)
      .map((item: any) => ({
        day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: getIcon(item.weather[0].main)
      }))
  }
  
  function getIcon(condition: string): string {
    const map: Record<string, string> = {
      Clear: 'sun',
      Clouds: 'cloud',
      Rain: 'cloud-rain',
      Thunderstorm: 'bolt',
      Snow: 'snowflake',
      Drizzle: 'cloud-showers-heavy',
      Mist: 'smog'
    }
    return map[condition] || 'cloud'
  }

  return {
    current,
    forecast,
    loading,
    error,
    fetchCurrentWeather,
    getHourlyForecast,
    getDailyForecast,
    fetchWeatherByCoords,
    fetchForecastByCoords,
    fetchForecast
  }
}
