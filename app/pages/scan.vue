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

      <!-- START (hidden kapag scanning) -->
      <button
        v-if="!isScanning"
        @click="startScan"
        class="btn start"
      >
        Start Scan
      </button>

      <!-- STOP (visible lang kapag scanning) -->
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
        stopScan()

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

    /* 🔥 IMPORTANT FIX */
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

  router.push('/')
}
</script>

<style scoped>
.scan-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
}

.video-feed {
  width: 100%;
  max-height: 400px;
  border: 3px solid #2563eb;
  border-radius: 12px;
  background: #000;
  margin: 1rem 0;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.start {
  background: #16a34a;
  color: white;
}

.stop {
  background: #dc2626;
  color: white;
}

.single {
  width: 200px;
}
</style>