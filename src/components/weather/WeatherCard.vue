<template>
  <div class="weather-card" :style="backgroundStyle">
    <div class="weather-card__top">
      <div class="weather-card__info">
        <h2 class="city">{{ data.city }}</h2>
        <p class="weather-time">{{ data.localTime }}</p>
        <p class="description">{{ data.description }}</p>
      </div>
      <div class="weather-card__temp">
        <p class="temperature">{{ data.temperature }}°</p>
        <div class="temp-range">
          <span>H:{{ data.high }}°</span>
          <span>L:{{ data.low }}°</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  data: {
    city: string;
    localTime: string;
    description: string;
    temperature: number;
    high: number;
    low: number;
    condition: string;
  };
}>();

const backgroundMap: Record<string, string> = {
  Clear: 'clear.jpg',
  Clouds: 'clouds.jpg',
  Rain: 'rain.jpg',
  Thunderstorm: 'storm.jpg',
  Snow: 'snow.jpg',
  Drizzle: 'drizzle.jpg',
  Mist: 'mist.jpg',
  default: 'default.jpg',
};

function capitalize(text: string | undefined) {
  if (!text) return 'Default'
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
const backgroundStyle = computed(() => {
  const condition = capitalize(props.data.condition) || 'default'
  const filename = backgroundMap[condition] ?? backgroundMap['default']

  // dynamic path resolution
  const imageUrl = new URL(`../../assets/images/${filename}`, import.meta.url).href

  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})
</script>

<style scoped>
.weather-card {
  color: white;
  position: relative;
  border-radius: 16px;
  padding: 0.75rem 1rem;
  display: block;
  flex-direction: column;
  justify-content: flex-start; 
  gap: 0.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.weather-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
}

.city {
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.2;
}

.weather-time {
  font-size: 0.8rem;
  opacity: 0.85;
  margin-top: -2px;
}

.description {
  font-size: 0.85rem;
  opacity: 0.9;
  text-transform: capitalize;
  line-height: 1.2;
}

.weather-card__temp {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0.25rem;
}

.temperature {
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
}

.temp-range {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
}
</style>
