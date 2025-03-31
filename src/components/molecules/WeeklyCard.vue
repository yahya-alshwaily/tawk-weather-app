<template>
    <div class="weekly-card">
      <div class="left">
        <FontAwesomeIcon :icon="['fas', data.icon]" class="icon" />
        <div class="text">
          <p class="day">{{ data.day }}</p>
          <p class="condition">{{ data.condition }}</p>
        </div>
      </div>
      <p class="temp">{{ data.temp }}° C</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    data: {
      day: string
      temp: number
      condition: string
      icon: string
    }
  }>()
  </script>
  
  <style scoped>
  .weekly-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f5fa;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  .left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .icon {
    font-size: 1.5rem;
    color: #5a6b82;
  }
  
  .text {
    display: flex;
    flex-direction: column;
  }
  
  .day {
    font-weight: 600;
    font-size: 1rem;
  }
  
  .condition {
    font-size: 0.875rem;
    opacity: 0.75;
  }
  
  .temp {
    font-size: 1rem;
    font-weight: bold;
  }
  </style>
  