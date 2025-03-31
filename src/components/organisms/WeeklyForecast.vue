<template>
    <div class="weekly-forecast">
      <WeeklyCard
        v-for="(day, index) in data"
        :key="index"
        :data="day"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import WeeklyCard from '@/components/molecules/WeeklyCard.vue'
  
  defineProps<{
    data: {
      day: string
      temp: number
      condition: string
      icon: string
    }[]
  }>()
  </script>
  
  <style scoped>
  .weekly-forecast {
    display: flex;
    flex-direction: column;
  }
  </style>
  