import { ref, watch } from 'vue'
import type { Weather } from '@/types/weather'

const LOCAL_STORAGE_KEY = 'weather-cards'

const weatherList = ref<Weather[]>([])

// Load from localStorage on init
const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
if (stored) {
  try {
    weatherList.value = JSON.parse(stored)
  } catch (err) {
    console.error('Failed to parse stored weather data', err)
  }
}

// Save to localStorage whenever it changes
watch(weatherList, (newVal) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

export function useWeatherList() {
  return {
    weatherList
  }
}
