<template>
  <div class="hourly-forecast">
    <div
      v-for="(hour, index) in data"
      :key="index"
      class="hour-card"
    >
      <BaseIcon :icon="getIcon(hour.icon)" class="weather-icon" />
      <p class="temp">{{ hour.temp }}°</p>
      <p class="time">{{ hour.time }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HourData } from "@/types/weather";
import BaseIcon from "@/components/common/BaseIcon.vue";

defineProps<{ data: HourData[] }>();

function getIcon(condition: string) {
  return condition || "cloud"; // fallback
}
</script>

<style scoped>
.hourly-forecast {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.hour-card {
  background-color: #f7f7f7;
  border-radius: 16px;
  padding: 1rem 0.75rem;
  text-align: center;
  min-width: 80px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.weather-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.temp {
  font-size: 1rem;
  font-weight: bold;
}

.time {
  font-size: 0.75rem;
  color: #555;
}
</style>
