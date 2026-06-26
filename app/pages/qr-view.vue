<template>
  <div class="view-page">
    <h2>QR Code Information</h2>

    <div v-if="qrData" class="result-box">
      <p>Nabasang Impormasyon:</p>
      <pre>{{ qrData }}</pre>
    </div>

    <div v-else class="no-data">
      <p>Walang nabasang QR code.</p>
    </div>

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
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
}

.result-box {
  padding: 1.5rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 10px;
  margin: 1.5rem 0;
  text-align: left;
  word-break: break-all;
}

pre {
  white-space: pre-wrap;
  font-size: 1rem;
}

.no-data {
  padding: 1.5rem;
  background: #fef2f2;
  border-radius: 10px;
  color: #dc2626;
}

.btn.back {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #6b7280;
  color: white;
  cursor: pointer;
}
</style>