<template>
  <main class="home">
    <header class="home__header">
      <h1>Weather</h1>
      <BaseIcon icon="person" />
    </header>

    <SearchBar @search="handleSearch" />

    <section class="weather-list">
      <router-link
        v-for="(weather, index) in weatherList"
        :key="index"
        :to="`/details/${weather.city}`"
        class="card-link"
      >
        <div>
          <WeatherCard :data="weather" />
        </div>
      </router-link>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "@/components/molecules/SearchBar.vue";
import WeatherCard from "@/components/organisms/WeatherCard.vue";
import BaseIcon from "@/components/atoms/BaseIcon.vue";

const weatherList = ref([
  {
    city: "My Location",
    location: "Bangsar South",
    temperature: 24,
    description: "Moderate Rain",
    high: 30,
    low: 25,
  },
  {
    city: "Seongnam-si",
    location: "7:30 PM",
    temperature: 21,
    description: "Partly Cloudy",
    high: 29,
    low: 15,
  },
]);

function handleSearch(city: string) {
  console.log("Search for:", city);
}
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
