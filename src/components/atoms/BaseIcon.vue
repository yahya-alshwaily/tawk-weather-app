<template>
    <FontAwesomeIcon :icon="icon" class="icon" />
  </template>
  
  <script setup lang="ts">
  defineProps<{
    icon: [string, string] | string // ex: 'search' or ['fas', 'search']
  }>()
  </script>
  
  <style scoped>
  .icon {
    width: 1.25rem;
    height: 1.25rem;
    color: inherit;
  }
  </style>
  