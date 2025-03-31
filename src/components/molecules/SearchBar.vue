<template>
    <form class="search-bar" @submit.prevent="onSubmit">
      <input
        v-model="query"
        type="text"
        class="search-bar__input"
        placeholder="Search for a city or airport"
        required
      />
      <button type="submit" class="search-bar__button" aria-label="Search">
        <BaseIcon :icon="'search'" />
      </button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import BaseIcon from '@/components/atoms/BaseIcon.vue'
  
  const query = ref('')
  const emit = defineEmits<{
    (e: 'search', value: string): void
  }>()
  
  function onSubmit() {
    if (query.value.trim()) {
      emit('search', query.value.trim())
      query.value = ''
    }
  }
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background-color: #f5f5f5;
    border-radius: 12px;
  }
  
  .search-bar__input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    background: transparent;
  }
  
  .search-bar__button {
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  