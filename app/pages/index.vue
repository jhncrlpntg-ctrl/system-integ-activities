<template>
  <div class = "text-center mb-6">
    <v-avatar size ="90" class = "mb-3 elevation-3">
      <v-img :src="user?.picture" />
    </v-avatar>

    <h1 class="text-h5 font-weight-bold mb-1">
      {{user?.name}}
    </h1>

    <p class="text-body-2 text-grey-darken-1">
      {{user?.email}}
    </p>
    
    <v-btn @click = "logout">Logout</v-btn>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
definePageMeta({
  middleware: 'auth'
})

const user = ref<any>(null)
const showScanner = ref(false)
const scannedValue = ref('')

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

<style>

</style>