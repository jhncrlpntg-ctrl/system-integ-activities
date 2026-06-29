<template>
  <v-app class="weather-app-root">
    <!-- 1. SIDEBAR / NAVIGATION DRAWER (Kaparehong-kapareho ng nasa default.vue mo) -->
    <v-navigation-drawer
      permanent
      color="#1e1e24"
      elevation="4"
      width="280"
    >
      <!-- NEW USER HEADER BLOCK (Lumalabas kapag may Google user) -->
      <div class="sidebar-user-header" v-if="user">
        <v-avatar size="50" class="elevation-2 border-avatar">
          <v-img :src="user.picture" alt="User Image" />
        </v-avatar>
        <div class="user-info-block">
          <div class="user-sidebar-name">{{ user.name }}</div>
          <div class="user-sidebar-email">{{ user.email }}</div>
        </div>
      </div>

      <!-- Fallback Header kung wala pang naka-load na user data -->
      <div class="sidebar-header" v-else>
        <v-icon color="primary" class="me-2">mdi-apps</v-icon>
        <span class="menu-title">Navigation</span>
      </div>

      <v-divider color="#2a2a32"></v-divider>

      <!-- Mga Menu Links (Ginawang "Weather" para magkatugma) -->
      <v-list nav dense class="mt-4">
        
        <!-- Link 1: Profile / Home Dashboard -->
        <v-list-item
          prepend-icon="mdi-account"
          title="Profile Home"
          value="home"
          to="/"
          active-class="active-menu-item"
          color="primary"
        ></v-list-item>

        <!-- Link 2: QR Code Scanner -->
        <v-list-item
          prepend-icon="mdi-qrcode-scan"
          title="QR-Code Scanner"
          value="scan"
          to="/scan"
          active-class="active-menu-item"
          color="primary"
        ></v-list-item>

        <!-- Link 3: Weather -->
        <v-list-item
          prepend-icon="mdi-weather-cloudy"
          title="Weather"
          value="weather"
          to="/weather"
          active-class="active-menu-item"
          color="primary"
        ></v-list-item>

      </v-list>
    </v-navigation-drawer>

    <!-- 2. MAIN CONTENT AREA (Dito nakalagay ang iyong magandang background image) -->
    <v-main class="weather-layout-wrapper">
      <div class="content-centered-container">
        <slot />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const user = ref<any>(null)

onMounted(() => {
  // Kinukuha ang Google User Data na nakasave sa cache ng browser mo
  if (import.meta.client) {
    const savedUser = localStorage.getItem('google_user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }
})
</script>

<style>
/* Ginagamit ang walang 'scoped' para maapektuhan pati ang mga parent containers ng Nuxt */
html, body, #__nuxt, .v-application, .v-application__wrap {
  background: transparent !important;
  background-color: transparent !important;
}
</style>

<style scoped>
/* Sinisiguro nitong malinis ang root display */
.weather-app-root {
  background-color: #121214 !important;
}

/* Sidebar Custom Header */
.sidebar-header {
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
}

.menu-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #9ca3af;
  letter-spacing: 0.5px;
}

/* Magandang User Information Layout */
.sidebar-user-header {
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.border-avatar {
  border: 2px solid #3b82f6; /* Blue ring glow para sa avatar box */
}

.user-info-block {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-sidebar-name {
  font-size: 0.95rem;
  font-weight: bold;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-sidebar-email {
  font-size: 0.75rem;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Custom styling kapag active ang kasalukuyang page */
:deep(.active-menu-item) {
  background: rgba(37, 99, 235, 0.15) !important;
  color: #3b82f6 !important;
  font-weight: 600 !important;
}

/* MAIN BACKGROUND CONTAINER */
.weather-layout-wrapper {
  background-image: url('/images/bckgrnd.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  height: 100vh;
  width: 100%;
}

/* Nilalagay nito sa gitna ang Weather card mo sa natitirang space ng screen */
.content-centered-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
