<template>
  <main class="weather-detail">
    <template v-if="loading">
      <div class="loading">Loading weather...</div>
    </template>

    <template v-else-if="error">
      <div class="error">
        <p>{{ error }}</p>
      </div>
    </template>
    <template v-else-if="currentWeather">
      <WeatherHeader
        :weather="currentWeather"
        :showAddButton="!isInList"
        :showRemoveButton="isInList"
        @add="handleAddCity"
        @remove="handleRemoveCity"
      />

      <section class="forecast-section">
        <h2>Hourly Forecast</h2>
        <HourlyForecast :data="hourlyData" />
      </section>

      <section class="forecast-section">
        <h2>Weekly Forecast</h2>
        <WeeklyForecast :data="weeklyData" />
      </section>
    </template>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useWeatherList } from "@/composables/useWeatherList";
import { useWeather } from "@/composables/useWeather";

const WeatherHeader = defineAsyncComponent(() =>
  import("@/components/layout/WeatherHeader.vue")
);
const HourlyForecast = defineAsyncComponent(() =>
  import("@/components/weather/HourlyForecast.vue")
);
const WeeklyForecast = defineAsyncComponent(() =>
  import("@/components/weather/WeeklyForecast.vue")
);


const route = useRoute();
const city = decodeURIComponent(route.params.city as string);

const { weatherList } = useWeatherList();

const isInList = computed(() =>
  weatherList.value.some((item) => item.city === forecast.value?.city.name)
);

const {
  forecast,
  fetchForecast,
  loading,
  error,
  getHourlyForecast,
  getDailyForecast,
  fetchForecastByCoords,
} = useWeather();

onMounted(() => {
  if (city === "My Location") {
    console.log("Using geolocation in detail view");
  } else {
    fetchForecast(city);
  }
});

const hourlyData = computed(() => getHourlyForecast());
const weeklyData = computed(() => getDailyForecast());

// Build header info from first forecast entry
const currentWeather = computed(() => {
  if (!forecast.value || !forecast.value.list.length) return null;

  const now = forecast.value.list[0];
  const date = new Date(now.dt * 1000);

  return {
    location:
      city === "My Location"
        ? "My Location"
        : `${forecast.value.city.name}, ${forecast.value.city.country}`,
    date: date.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
    }),
    temperature: Math.round(now.main.temp),
    condition: now.weather[0].description,
    lastUpdated: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    icon: mapIcon(now.weather[0].main),
  };
});

function handleAddCity() {
  if (!forecast.value || !forecast.value.list.length) return;

  const current = forecast.value.list[0];
  const localTime = new Date(
    Date.now() + forecast.value.city.timezone * 1000 - new Date().getTimezoneOffset() * 60000
  ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  weatherList.value.push({
    city: forecast.value.city.name,
    location: forecast.value.city.country,
    temperature: Math.round(current.main.temp),
    description: current.weather[0].description,
    high: Math.round(current.main.temp_max),
    low: Math.round(current.main.temp_min),
    localTime,
    condition: current.weather[0].main 
  });
}


function handleRemoveCity() {
  if (!forecast.value) return;

  weatherList.value = weatherList.value.filter(
    (item) => item.city !== forecast.value!.city.name
  );
}

function mapIcon(condition: string): string {
  const map: Record<string, string> = {
    Clear: "sun",
    Clouds: "cloud",
    Rain: "cloud-rain",
    Thunderstorm: "bolt",
    Snow: "snowflake",
    Drizzle: "cloud-showers-heavy",
    Mist: "smog",
  };
  return map[condition] || "cloud";
}

onMounted(() => {
  if (city === "My Location") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchForecastByCoords(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  } else {
    fetchForecast(city);
  }
});
</script>

<style scoped>
.weather-detail {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.forecast-section h2 {
  margin-bottom: 0.75rem;
}

.loading {
  text-align: center;
  padding: 1.5rem;
  font-weight: bold;
}

.error {
  text-align: center;
  padding: 1rem;
  color: #d32f2f;
  background-color: #ffeaea;
  border-radius: 8px;
}

.error button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

</style>