<template>
  <div class="search-container">
    <div class="search-bar">
      <BaseIcon icon="search" class="search-icon" />

      <input
        v-model="query"
        type="text"
        class="search-input"
        placeholder="Search for a city or airport"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />

      <button
        v-if="searching"
        @click="clearQuery"
        class="clear-button"
        aria-label="Clear or Cancel"
      >
        <BaseIcon icon="x" />
      </button>
    </div>

    <ul v-if="suggestions.length" class="suggestions">
      <li
        v-for="(city, index) in suggestions"
        class="suggestion-item"
        @click="selectCity(city)"
        
        tabindex="0"
        @keydown.enter="selectCity(city)"
      >
        {{ formatCity(city) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "lodash";
import type { CityResult } from "@/types/cityresult";
import { searchCities } from "@/composables/useCitySearch";
import BaseIcon from "@/components/common/BaseIcon.vue";

defineProps<{
  searching?: boolean;
}>();

const emit = defineEmits<{
  (e: "search", city: CityResult): void;
  (e: "focus"): void;
  (e: "blur"): void;
}>();

const query = ref("");
const suggestions = ref<CityResult[]>([]);

function clearQuery() {
  if (query.value) {
    query.value = "";
    suggestions.value = [];
  } else {
    emit("blur"); // Exit search mode if already empty
  }
}

function selectCity(city: CityResult) {
  emit("search", city);
  clearQuery();
}

function formatCity(city: CityResult) {
  return `${city.name}${city.state ? ", " + city.state : ""}, ${city.country}`;
}

watch(
  query,
  debounce(async (val) => {
    if (val.length >= 3) {
      suggestions.value = await searchCities(val);
    } else {
      suggestions.value = [];
    }
  }, 300)
);
</script>

<style scoped>
.search-container {
  padding: 1rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 999px;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
}

.search-icon {
  margin-right: 0.5rem;
  font-size: 1rem;
  color: #999;
}

.clear-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0 0.25rem;
  color: #555;
}

.clear-button:hover {
  color: #000;
}

.suggestions {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.suggestion-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background-color: #f9f9f9;
}
</style>
