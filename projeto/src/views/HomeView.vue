<script setup>
import MiddlePageComponent from '@/components/MiddlePageComponent.vue';
import StartPageComponent from '@/components/StartPageComponent.vue';
import FinalPageComponent from '@/components/FinalPageComponent.vue';
</script>

<template>
  <span id="inicio">
    <StartPageComponent />
  </span>
  <MiddlePageComponent />
  <span id="final">
    <FinalPageComponent />
  </span>
</template>

<style scoped>
</style>
