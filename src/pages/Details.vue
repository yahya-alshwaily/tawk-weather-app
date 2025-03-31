<template>
  <main class="weather-detail">
    <WeatherHeader :weather="currentWeather" />

    <section class="forecast-section">
      <h2>Hourly Forecast</h2>
      <HourlyForecast :data="hourlyData" />
    </section>

    <section class="forecast-section">
      <h2>Weekly Forecast</h2>
      <WeeklyForecast :data="weeklyData" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WeatherHeader from "@/components/organisms/WeatherHeader.vue";
import HourlyForecast from "@/components/organisms/HourlyForecast.vue";
import WeeklyForecast from "@/components/organisms/WeeklyForecast.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const city = route.params.city as string;

console.log("Selected City:", city);
const currentWeather = ref({
  location: "Bangsar South, KL",
  date: "Monday, 20 December 2021",
  temperature: 24,
  condition: "Moderate Rain",
  lastUpdated: "6:00 PM",
  icon: "cloud-rain",
});

const hourlyData = ref([
  { time: "7:00 PM", temp: 20, icon: "cloud-rain" },
  { time: "8:00 PM", temp: 20, icon: "cloud" },
  { time: "9:00 PM", temp: 19, icon: "cloud-moon-rain" },
  { time: "10:00 PM", temp: 19, icon: "cloud" },
]);

const weeklyData = ref([
  { day: "Monday", temp: 30, condition: "Sunny", icon: "sun" },
  { day: "Tuesday", temp: 19, condition: "Thunderstorms", icon: "bolt" },
  {
    day: "Wednesday",
    temp: 17,
    condition: "Heavy Rain",
    icon: "cloud-showers-heavy",
  },
  { day: "Thursday", temp: 17, condition: "Cloudy", icon: "cloud" },
]);
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
