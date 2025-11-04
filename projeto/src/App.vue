<script setup>
import { ref, onMounted } from 'vue'
import api from './plugins/axios'

import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />
  <router-view />
  <FooterComponent />
</template>

<style scoped></style>
