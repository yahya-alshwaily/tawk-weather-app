<template>
    <div class="weather-header">
      <div class="weather-header__nav">
        <BaseIcon icon="chevron-left" @click="$router.back()" />
      </div>
  
      <div class="weather-header__main">
        <h2 class="location">{{ weather.location }}</h2>
        <p class="date">{{ weather.date }}</p>
  
        <FontAwesomeIcon
          :icon="['fas', weather.icon]"
          class="weather-icon"
        />
  
        <p class="temp">{{ weather.temperature }}° C</p>
        <p class="condition">{{ weather.condition }}</p>
  
        <p class="updated">
          Last Update {{ weather.lastUpdated }}
          <FontAwesomeIcon icon="rotate" class="refresh-icon" />
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import BaseIcon from '@/components/atoms/BaseIcon.vue'
  
  defineProps<{
    weather: {
      location: string
      date: string
      temperature: number
      condition: string
      lastUpdated: string
      icon: string
    }
  }>()
  </script>
  
  <style scoped>
  .weather-header {
    background: linear-gradient(to bottom, #4a6fa5, #6f92c3);
    color: white;
    padding: 1.5rem 1rem;
    border-radius: 16px;
    text-align: center;
    position: relative;
  }
  
  .weather-header__nav {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  
  .weather-header__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  
  .location {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .date {
    font-size: 0.875rem;
    opacity: 0.9;
  }
  
  .weather-icon {
    font-size: 2.5rem;
    margin: 0.5rem 0;
  }
  
  .temp {
    font-size: 2rem;
    font-weight: bold;
  }
  
  .condition {
    font-size: 1rem;
  }
  
  .updated {
    font-size: 0.75rem;
    opacity: 0.85;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    justify-content: center;
  }
  
  .refresh-icon {
    font-size: 0.75rem;
  }
  </style>
  