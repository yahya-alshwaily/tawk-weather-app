<template>
  <main class="home">
    <header class="home__header">
      <h1>Weather</h1>
      <BaseIcon icon="user-circle" />
    </header>

    <SearchBar @search="handleCitySelect" />

    <section class="weather-list">
      <router-link
        v-for="(weather, index) in weatherList"
        :key="index"
        :to="`/detail/${encodeURIComponent(weather.city)}`"
        class="card-link"
      >
        <WeatherCard :data="weather" />
      </router-link>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SearchBar from "@/components/molecules/SearchBar.vue";
import WeatherCard from "@/components/organisms/WeatherCard.vue";
import BaseIcon from "@/components/atoms/BaseIcon.vue";
import { useWeather } from "@/composables/useWeather";
import type { Weather } from "@/types/weather";
import type { CityResult } from '@/types/cityresult'
import { useRouter } from "vue-router";

const router = useRouter()

const { current, loading, error, fetchCurrentWeather, fetchWeatherByCoords } = useWeather()

const weatherList = ref<Weather[]>([]);

async function getMyLocationWeather() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      await fetchWeatherByCoords(latitude, longitude);
      if (current.value) {
        weatherList.value.unshift({
          city: current.value.name,
          location: "My Location",
          temperature: Math.round(current.value.main.temp),
          description: current.value.weather[0].description,
          high: Math.round(current.value.main.temp_max),
          low: Math.round(current.value.main.temp_min),
        });
      }
    },
    (err) => {
      console.error("Geolocation error:", err);
    }
  );
}
async function handleCitySelect(city: CityResult) {
  await fetchWeatherByCoords(city.lat, city.lon)

  if (!current.value) {
    console.warn("No weather data returned")
    return
  }

  const alreadyInList = weatherList.value.some(
    (item) => item.city === current.value!.name
  )

  if (!alreadyInList) {
    weatherList.value.push({
      city: current.value.name,
      location: `${city.state || ""} ${city.country}`.trim(),
      temperature: Math.round(current.value.main.temp),
      description: current.value.weather[0].description,
      high: Math.round(current.value.main.temp_max),
      low: Math.round(current.value.main.temp_min)
    })
  }

  router.push(`/detail/${encodeURIComponent(current.value.name)}`)
}

onMounted(() => {
  getMyLocationWeather()
})

</script>

<style scoped>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.home__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>
