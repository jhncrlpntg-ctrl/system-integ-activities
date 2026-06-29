<template>
  <div class="weather-card">
    <h1 class="app-title">🌤️ Weather Update</h1>

    <!-- 💡 Lalabas lang ang layout kapag tapos na mag-load at may valid data ang currentWeather -->
    <div v-if="currentWeather" class="weather-display">
      
      <!-- MAIN BOX: Icon at Temperature -->
      <div class="main-weather-box">
        <h2 class="location-name">{{ currentWeather.location?.name }}, {{ currentWeather.location?.country }}</h2>
        <div class="hero-weather">
          <!-- Weather Icon galing sa API -->
          <img :src="`https:${currentWeather.current?.condition?.icon}`" alt="Weather Icon" class="weather-icon" />
          <div class="temp-condition">
            <span class="main-temp">{{ currentWeather.current?.temp_c }}°C</span>
            <p class="condition-text">{{ currentWeather.current?.condition?.text }}</p>
          </div>
        </div>
      </div>

      <!-- DETAILS GRID: Mga kahon para sa iba pang detalye ng panahon -->
      <div class="details-grid">
        <div class="info-box">
          <span class="box-label">Wind Speed</span>
          <span class="box-value">💨 {{ currentWeather.current?.wind_kph }} kph</span>
        </div>
        <div class="info-box">
          <span class="box-label">Humidity</span>
          <span class="box-value">💧 {{ currentWeather.current?.humidity }}%</span>
        </div>
        <div class="info-box">
          <span class="box-label">Feels Like</span>
          <span class="box-value">🌡️ {{ currentWeather.current?.feelslike_c }}°C</span>
        </div>
        <div class="info-box">
          <span class="box-label">UV Index</span>
          <span class="box-value">☀️ {{ currentWeather.current?.uv }}</span>
        </div>
      </div>

    </div>

    <!-- REFRESH BUTTON (Outlined / Transparent at nasa pinakailalim) -->
    <v-btn 
      variant="outlined"
      color="primary" 
      @click="getWeatherData" 
      class="refresh-btn"
      block
    >
      <v-icon start>mdi-refresh</v-icon>
      Refresh Weather
    </v-btn>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'weather',
  middleware: 'auth'
})

const route = useRoute()
const currentWeather = ref<any>(null)

const getWeatherData = async () => {
  // Ligtas na panseguridad para sa browser execution
  if (!import.meta.client) return

  const cityQuery = route.query.q || 'Manila'

  try {
    const data = await $fetch(`http://api.weatherapi.com/v1/forecast.json?key=8276fe2ecbcf4e1cb0132726262906&q=Manila&days=3&aqi=no&alerts=no`)
    currentWeather.value = data
  } catch (err) {
    console.error("Fetch error:", err)
  }
}

// Babantayan nito ang pagbabago sa URL params query string (?q=)
watch(
  () => route.query.q, 
  () => {
    getWeatherData()
  }
)

onMounted(() => {
  getWeatherData()
})
</script>

<style scoped>
/* Card Wrapper */
.weather-card {
  background: rgba(255, 255, 255, 0.85);
  padding: 25px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  width: 100%;
  max-width: 450px;
  z-index: 10;
}

.app-title {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* Transparent Button Configuration */
.refresh-btn {
  margin-top: 20px;
  text-transform: none;
  font-weight: bold;
  letter-spacing: 0.5px;
  border-radius: 10px;
  border-width: 2px;
}

/* Main Display Container */
.weather-display {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Big Top Box (Icon + Temp) */
.main-weather-box {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(9, 132, 227, 0.3);
}

.location-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.hero-weather {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.weather-icon {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.15));
}

.temp-condition {
  text-align: left;
}

.main-temp {
  font-size: 42px;
  font-weight: bold;
  line-height: 1;
}

.condition-text {
  font-size: 16px;
  margin-top: 5px;
  opacity: 0.9;
}

/* Bottom Grid for smaller boxes */
.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Individual boxes inside the grid */
.info-box {
  background: white;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.box-label {
  font-size: 12px;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.box-value {
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
