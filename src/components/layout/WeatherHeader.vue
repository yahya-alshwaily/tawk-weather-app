<template>
  <header class="weather-header">
    <div class="header-buttons">
      <button @click="$router.back()" class="icon-button" aria-label="Back">
        <BaseIcon icon="chevron-left" />
      </button>

      <button
        v-if="showAddButton"
        @click="emit('add')"
        class="icon-button"
        aria-label="Add city"
      >
        <BaseIcon icon="plus" />
      </button>

      <button
        v-else-if="showRemoveButton"
        @click="emit('remove')"
        class="icon-button"
        aria-label="Remove city"
      >
        <BaseIcon icon="trash-can" />
      </button>
    </div>

    <h2 class="location">{{ weather.location }}</h2>
    <p class="date">{{ weather.date }}</p>

    <div class="weather-icon">
      <BaseIcon :icon="weather.icon" />
    </div>

    <p class="temperature">{{ weather.temperature }}° C</p>
    <p class="condition">{{ weather.condition }}</p>
    <p class="updated">Last Update {{ weather.lastUpdated }}</p>
  </header>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/common/BaseIcon.vue";

defineProps<{
  weather: {
    location: string;
    date: string;
    temperature: number;
    condition: string;
    lastUpdated: string;
    icon: string;
  };
  showAddButton?: boolean;
  showRemoveButton?: boolean;
}>();

const emit = defineEmits(["add", "remove"]);
</script>

<style scoped>
.weather-header {
  margin: 1rem;
  padding: 2rem 1rem 2.5rem;
  background: linear-gradient(to bottom, #4a90e2, #72b5f8);
  color: white;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.header-buttons {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

.icon-button {
  background: white;
  border: none;
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a4a4a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  font-size: 1.1rem;
  cursor: pointer;
}

.location {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 2.5rem;
}

.date {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.weather-icon {
  font-size: 2.5rem;
  margin: 0.5rem 0;
}

.temperature {
  font-size: 2rem;
  font-weight: bold;
}

.condition {
  font-size: 1rem;
  text-transform: capitalize;
  margin-bottom: 0.25rem;
}

.updated {
  font-size: 0.75rem;
  opacity: 0.85;
}
</style>
