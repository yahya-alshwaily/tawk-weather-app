<template>
<div class="search-bar-wrapper">
  <div class="search-bar">
    <input
      v-model="query"
      type="text"
      class="search-bar__input"
      placeholder="Search for a city or airport"
    />
    <button class="search-bar__button" type="button" disabled>
      <BaseIcon icon="search" />
    </button>
  </div>

  <ul v-if="suggestions.length" class="suggestions">
    <li
      v-for="(city, index) in suggestions"
      :key="index"
      @click="selectCity(city)"
      class="suggestion-item"
    >
      {{ formatCity(city) }}
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { searchCities } from "@/composables/useCitySearch";
import BaseIcon from "@/components/atoms/BaseIcon.vue";
import type { CityResult } from "@/types/cityresult";

const emit = defineEmits<{
  (e: "search", city: CityResult): void;
}>();

const query = ref("");
const suggestions = ref<CityResult[]>([]);

function selectCity(city: CityResult) {
  console.log("City selected:", city)
  emit("search", city);
  query.value = "";
  suggestions.value = [];
}

function formatCity(city: CityResult) {
  return `${city.name}${city.state ? ", " + city.state : ""}, ${city.country}`;
}

watch(query, async (newVal) => {
  if (newVal.length >= 3) {
    const results = await searchCities(newVal);
    suggestions.value = results;
  } else {
    suggestions.value = [];
  }
});
</script>

<style scoped>
.search-bar-wrapper {
  position: relative;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #f5f5f5;
  border-radius: 12px;
}

.search-bar__input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
}

.search-bar__button {
  background: none;
  border: none;
  cursor: pointer;
}

.suggestions {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.suggestion-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background-color: #f0f0f0;
}
</style>
