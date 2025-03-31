<template>
  <main class="weather-detail">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <template v-else-if="currentWeather">
      <WeatherHeader :weather="currentWeather" />

      <section class="forecast-section">
        <h2>Hourly Forecast</h2>
        <HourlyForecast :data="hourlyData" />
      </section>

      <section class="forecast-section">
        <h2>Weekly Forecast</h2>
        <WeeklyForecast :data="weeklyData" />
      </section>
    </template>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import WeatherHeader from "@/components/organisms/WeatherHeader.vue";
import HourlyForecast from "@/components/organisms/HourlyForecast.vue";
import WeeklyForecast from "@/components/organisms/WeeklyForecast.vue";

import { useWeather } from "@/composables/useWeather";

const route = useRoute();
const city = decodeURIComponent(route.params.city as string)

const {
  forecast,
  fetchForecast,
  loading,
  error,
  getHourlyForecast,
  getDailyForecast,
  fetchForecastByCoords,
} = useWeather();

onMounted(() => {
  if (city === "My Location") {
    console.log("Using geolocation in detail view")
  } else {
    fetchForecast(city)
  }
})

const hourlyData = computed(() => getHourlyForecast());
const weeklyData = computed(() => getDailyForecast());

// Build header info from first forecast entry
const currentWeather = computed(() => {
  if (!forecast.value || !forecast.value.list.length) return null

  const now = forecast.value.list[0]
  const date = new Date(now.dt * 1000)

  return {
    location: city === "My Location"
      ? "My Location"
      : `${forecast.value.city.name}, ${forecast.value.city.country}`,
    date: date.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long"
    }),
    temperature: Math.round(now.main.temp),
    condition: now.weather[0].description,
    lastUpdated: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    icon: mapIcon(now.weather[0].main)
  }
})

function mapIcon(condition: string): string {
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

onMounted(() => {
  if (city === "My Location") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          await fetchForecastByCoords(latitude, longitude)
        },
        (err) => {
          console.error("Geolocation error:", err)
        }
      )
    }
  } else {
    fetchForecast(city)
    console.log('Forecast after fetch:', forecast.value)
  }
})

</script>

<style scoped>
.weather-detail {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.forecast-section h2 {
  margin-bottom: 0.75rem;
}
</style>
