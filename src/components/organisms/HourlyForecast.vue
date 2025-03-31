<template>
    <div class="hourly-forecast">
      <HourlyCard
        v-for="(hour, index) in data"
        :key="index"
        :data="hour"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import HourlyCard from '@/components/molecules/HourlyCard.vue'
  
  defineProps<{
    data: {
      time: string
      temp: number
      icon: string
    }[]
  }>()
  </script>
  
  <style scoped>
  .hourly-forecast {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .hourly-forecast::-webkit-scrollbar {
    height: 4px;
  }
  .hourly-forecast::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  </style>
  