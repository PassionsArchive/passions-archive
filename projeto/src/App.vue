<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const authStore = useAuthStore()

onMounted(async () => {
  // Carregar dados de autenticação do localStorage
  authStore.loadFromStorage()

  // Validar se a sessão ainda é válida
  if (authStore.isAuthenticated) {
    await authStore.validateSession()
  }
})
</script>

<template>
  <HeaderComponent />
  <router-view />
  <FooterComponent />
</template>

<style scoped></style>
