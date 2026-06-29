<template>
  <div class="scan-page">
    <h2>Scan QR Code</h2>

    <video
      id="qr-video"
      class="video-feed"
      autoplay
      playsinline
      muted
    ></video>

    <div class="buttons">

      <!-- START SCAN (Solong button na lang kapag hindi nag-i-scan) -->
      <button
        v-if="!isScanning"
        @click="startScan"
        class="btn start single"
      >
        Start Scan
      </button>

      <!-- STOP SCAN (Visible lang kapag scanning) -->
      <button
        v-if="isScanning"
        @click="stopScan"
        class="btn stop single"
      >
        Stop Scan
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let qrScannerInstance = null

const isScanning = ref(false)

/* CLEANUP */
onUnmounted(() => {
  if (qrScannerInstance) {
    qrScannerInstance.stop()
    qrScannerInstance.destroy()
    qrScannerInstance = null
  }
})

/* START SCAN */
const startScan = async () => {
  if (import.meta.server) return

  try {
    const QrScanner = (await import('qr-scanner')).default
    const videoEl = document.getElementById('qr-video')

    if (!videoEl) throw new Error('Video not found')

    if (qrScannerInstance) {
      qrScannerInstance.stop()
      qrScannerInstance.destroy()
    }

    qrScannerInstance = new QrScanner(
      videoEl,
      (result) => {
        if (qrScannerInstance) {
          qrScannerInstance.stop()
          qrScannerInstance.destroy()
          qrScannerInstance = null
        }
        isScanning.value = false

        router.push({
          path: '/qr-view',
          query: { data: result.data }
        })
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: 'environment',
        maxScansPerSecond: 15
      }
    )

    isScanning.value = true
    await qrScannerInstance.start()

  } catch (err) {
    console.error(err)
    alert('Payagan ang camera access')
    isScanning.value = false
  }
}

/* STOP SCAN */
const stopScan = () => {
  if (qrScannerInstance) {
    qrScannerInstance.stop()
    qrScannerInstance.destroy()
    qrScannerInstance = null
  }
  isScanning.value = false
}
</script>

<style scoped>
.scan-page {
  max-width: 900px; 
  margin: 3rem auto;
  padding: 1.5rem;
  text-align: center;
}

h2 {
  font-size: 2rem; 
  margin-bottom: 1.5rem;
}

.video-feed {
  width: 100%;
  max-height: 550px; 
  border: 4px solid #2563eb;
  border-radius: 16px;
  background: #000;
  margin: 1.5rem 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); 
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 1rem 2rem; 
  border: none;
  border-radius: 10px;
  font-size: 1.2rem; 
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px); 
}

.start {
  background: #16a34a;
  color: white;
}

.stop {
  background: #dc2626;
  color: white;
}

/* Ginawang parehong 250px ang lapad ng Start at Stop para pantay ang UI transitions */
.single {
  width: 250px; 
}
</style>
z