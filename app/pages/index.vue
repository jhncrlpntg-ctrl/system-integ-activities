<template>
  <div class="text-center mb-6">

    <v-card
      max-width="650"
      color="white"
      class="mx-auto pa-5 mt-4"
      rounded="xl"
      elevation="4"
    >

      <v-avatar
        size="90"
        class="mb-3 elevation-3"
      >
        <v-img :src="user?.picture" />
      </v-avatar>

      <h1 class="text-h5 font-weight-bold mb-1">
        {{ user?.name }}
      </h1>

      <p class="text-body-2 text-grey-darken-1 mb-5">
        {{ user?.email }}
      </p>

      <h3 class="mb-4">
        📍 Map Location
      </h3>

      <LeafletMap />

      <!-- 💡 Inalis na dito ang lumang QR-Code button dahil nasa sidebar na ito -->

      <v-btn
        class="mt-5"
        color="red-darken-2"
        size="large"
        rounded="xl"
        block
        prepend-icon="mdi-logout"
        @click="logout"
      >
        Logout
      </v-btn>

    </v-card>

  </div>
</template>

<script setup lang="ts">
// @ts-nocheck

import LeafletMap from '~/components/LeafletMap.vue'

definePageMeta({
  middleware: 'auth'
})

const user = ref<any>(null)

onMounted(() => {
  const savedUser = localStorage.getItem('google_user')

  if (!savedUser) {
    navigateTo('/login')
    return
  }

  user.value = JSON.parse(savedUser)
})

const logout = () => {
  localStorage.removeItem('google_user')
  localStorage.removeItem('google_token')
  window.google?.accounts.id.disableAutoSelect()
  navigateTo('/login')
}
</script>

<style scoped>
.text-center {
  margin-top: 40px;
}
</style>
