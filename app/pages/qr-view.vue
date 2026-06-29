<template>
  <div class="view-page">
    <h2>QR Code Information</h2>

    <div v-if="qrData && qrData !== 'No data found'" class="result-box">
      <p class="result-title">Nabasang Impormasyon:</p>
      <pre>{{ qrData }}</pre>
    </div>

    <div v-else class="no-data">
      <p>Walang nabasang QR code.</p>
    </div>

    <!-- Ginawang malaki at kapareho ng disenyo ng scan page button -->
    <button @click="goBack" class="btn back">
      Bumalik sa Scan
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const qrData = ref('')

onMounted(() => {
  qrData.value = route.query.data || 'No data found'
})

const goBack = () => {
  router.push('/scan')
}
</script>

<style scoped>
.view-page {
  /* Ginawang 900px para kapareho ng laki ng pinalaking scan.vue niyo */
  max-width: 900px; 
  margin: 3rem auto;
  padding: 1.5rem;
  text-align: center;
}

h2 {
  font-size: 2rem; /* Nilakihan ang title */
  margin-bottom: 1.5rem;
}

.result-box {
  padding: 2rem; /* Nilakihan ang espasyo sa loob ng box */
  background: #f0f9ff;
  border: 2px solid #bae6fd; /* Mas makapal na border */
  border-radius: 16px; /* Bagay sa kurbada ng video feed */
  margin: 2rem 0;
  text-align: left;
  word-break: break-all;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); /* May kaunting shadow para mag-pop out */
}

.result-title {
  font-weight: bold;
  font-size: 1.2rem;
  color: #0369a1;
  margin-bottom: 0.75rem;
}

pre {
  white-space: pre-wrap;
  font-size: 1.1rem; /* Nilakihan ang font ng nabasang text */
  background: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e0f2fe;
  font-family: monospace;
}

.no-data {
  padding: 2rem;
  background: #fef2f2;
  border: 2px solid #fca5a5;
  border-radius: 16px;
  color: #dc2626;
  font-size: 1.2rem;
  margin: 2rem 0;
}

.btn.back {
  /* Kaparehong-kapareho ng laki at disenyo sa scan page buttons mo */
  padding: 1rem 2rem; 
  border: none;
  border-radius: 10px;
  background: #6b7280;
  color: white;
  font-size: 1.2rem; 
  font-weight: bold;
  cursor: pointer;
  width: 250px; /* Mas malapad para madaling pindutin */
  transition: all 0.2s ease;
}

.btn.back:hover {
  opacity: 0.9;
  transform: translateY(-2px); /* Umaangat din ng kaunti kapag hinover */
}
</style>
