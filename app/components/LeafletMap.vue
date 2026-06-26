<template>
  <ClientOnly>
    <LMap
      v-model:zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
      style="height:300px; width:100%; border-radius:10px;"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <LMarker :lat-lng="center">
        <LPopup>
          📍 You are here
        </LPopup>
      </LMarker>
    </LMap>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const zoom = ref(18)

const center = ref<[number, number]>([
  14.5995,
  120.9842
])

onMounted(() => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.")
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      center.value = [
        position.coords.latitude,
        position.coords.longitude
      ]

      console.log("Latitude:", position.coords.latitude)
      console.log("Longitude:", position.coords.longitude)
      console.log("Accuracy:", position.coords.accuracy, "meters")
    },
    (error) => {
      console.error(error)

      if (error.code === error.PERMISSION_DENIED) {
        alert("Please allow location permission.")
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }
  )
})
</script>