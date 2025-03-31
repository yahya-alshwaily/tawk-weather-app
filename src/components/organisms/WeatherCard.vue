<template>
    <div class="weather-card">
      <div class="weather-card__top">
        <div>
          <h2>{{ data.city }}</h2>
          <p class="location">{{ data.location }}</p>
        </div>
        <p class="temp">{{ data.temperature }}°</p>
      </div>
  
      <div class="weather-card__bottom">
        <p>{{ data.description }}</p>
        <p class="range">H:{{ data.high }}°  L:{{ data.low }}°</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  export interface WeatherCardProps {
    city: string
    location: string
    temperature: number
    description: string
    high: number
    low: number
  }
  
  defineProps<{
    data: WeatherCardProps
  }>()
  </script>
  
  <style scoped>
  .weather-card {
    background: linear-gradient(to right, #4a6fa5, #314d78);
    color: white;
    padding: 1rem;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .weather-card__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .weather-card__bottom {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    opacity: 0.85;
  }
  
  .temp {
    font-size: 2rem;
    font-weight: bold;
  }
  
  .location {
    font-size: 0.875rem;
    opacity: 0.9;
  }
  
  .range {
    font-weight: 500;
  }
  </style>
  