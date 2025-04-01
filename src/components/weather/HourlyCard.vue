<template>
    <div class="hourly-card">
      <FontAwesomeIcon :icon="['fas', data.icon]" class="icon" />
      <p class="temp">{{ data.temp }}°</p>
      <p class="time">{{ data.time }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    data: {
      time: string
      temp: number
      icon: string
    }
  }>()
  </script>
  
  <style scoped>
  .hourly-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f7f7f7;
    border-radius: 12px;
    padding: 0.75rem;
    min-width: 80px;
    text-align: center;
    color: #333;
  }
  
  .icon {
    font-size: 1.5rem;
    color: #555;
  }
  
  .temp {
    font-size: 1rem;
    font-weight: 600;
  }
  
  .time {
    font-size: 0.75rem;
    opacity: 0.8;
  }
  </style>
  