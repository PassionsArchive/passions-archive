<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const authStore = useAuthStore()

onMounted(async () => {
  authStore.loadFromStorage()

  if (authStore.isAuthenticated) {
    await authStore.validateSession()
  }
})
</script>

<template>
  <HeaderComponent/>
  <router-view />
  <FooterComponent />
</template>

<style scoped></style>
