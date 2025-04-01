<template>
  <div class="weekly-forecast">
    <div
      v-for="(day, index) in data"
      :key="index"
      class="day-card"
    >
      <div class="left">
        <BaseIcon :icon="getIcon(day.icon)" class="day-icon" />
        <span class="day-name">{{ day.day }}</span>
      </div>
      <div class="right">
        <p class="temp">{{ day.temp }}° C</p>
        <p class="condition">{{ day.condition }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayData } from "@/types/weather";
import BaseIcon from "@/components/common/BaseIcon.vue";

defineProps<{ data: DayData[] }>();

function getIcon(condition: string) {
  return condition || "cloud";
}
</script>

<style scoped>
.weekly-forecast {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.day-card {
  background-color: #f2f6ff;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.day-icon {
  font-size: 1.25rem;
}

.day-name {
  font-size: 0.95rem;
  font-weight: 500;
}

.right {
  text-align: right;
}

.temp {
  font-size: 1rem;
  font-weight: bold;
}

.condition {
  font-size: 0.85rem;
  color: #666;
}
</style>
