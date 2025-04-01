<template>
  <main class="home">
    <template v-if="loading">
      <div class="loading">Loading weather...</div>
    </template>

    <template v-else-if="error">
      <div class="error">
        <p>{{ error }}</p>
      </div>
    </template>

    <div v-if="!searchMode">
      <header class="home__header">
        <h1>Weather</h1>
        <button
          @click="router.push('/profile')"
          class="profile-button"
          aria-label="Edit Profile"
        >
          <BaseIcon icon="user-circle" />
        </button>
      </header>
    </div>

    <SearchBar
      @search="handleCitySelect"
      @focus="searchMode = true"
      @blur="handleBlur"
      :searching="searchMode"
    />

    <section class="weather-list" v-if="!searchMode">
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
import SearchBar from "@/components/search/SearchBar.vue";
import WeatherCard from "@/components/weather/WeatherCard.vue";
import BaseIcon from "@/components/common/BaseIcon.vue";
import { useWeather } from "@/composables/useWeather";
import { useWeatherList } from "@/composables/useWeatherList";
import type { CityResult } from "@/types/cityresult";
import { useRouter } from "vue-router";

const router = useRouter();
const searchMode = ref(false);
const { current, loading, error, fetchWeatherByCoords } = useWeather();
const { weatherList } = useWeatherList();

function getLocalTime(offsetSeconds: number): string {
  const nowUTC = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  const localTime = new Date(nowUTC + offsetSeconds * 1000);
  return localTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function getMyLocationWeather() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      await fetchWeatherByCoords(latitude, longitude);
      if (!current.value) return;

      const localTime = getLocalTime(current.value.timezone);
      // console.log(localTime)
      if (!weatherList.value.some((item) => item.location === "My Location")) {
        weatherList.value.unshift({
          city: current.value.name,
          location: "My Location",
          temperature: Math.round(current.value.main.temp),
          description: current.value.weather[0].description,
          high: Math.round(current.value.main.temp_max),
          low: Math.round(current.value.main.temp_min),
          localTime: localTime, 
          condition: current.value.weather[0].main, 
        });
      }
    },
    (err) => {
      console.error("Geolocation error:", err);
    }
  );
}

async function handleCitySelect(city: CityResult) {
  await fetchWeatherByCoords(city.lat, city.lon);
  if (!current.value) return;

  router.push(`/detail/${encodeURIComponent(current.value.name)}`);
}


function handleBlur() {
  setTimeout(() => {
    searchMode.value = false;
  }, 200);
}

onMounted(() => {
  getMyLocationWeather();
});
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

.profile-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
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

.loading {
  text-align: center;
  padding: 1.5rem;
  font-weight: bold;
}

.error {
  text-align: center;
  padding: 1rem;
  color: #d32f2f;
  background-color: #ffeaea;
  border-radius: 8px;
}

.error button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
