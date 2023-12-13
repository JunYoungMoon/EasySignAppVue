<script setup lang="ts">
import { useConfig } from '@/store';
import { computed, type ComputedRef } from 'vue';

const configStore = useConfig();
/** Theme Icon Change */
const themeIcon: ComputedRef<string> = computed(() =>
  configStore.theme ? 'mdi mdi-weather-night' : 'mdi mdi-weather-sunny'
);
</script>

<template>
  <!-- Toggle Dark mode -->
  <v-btn :icon="themeIcon" variant="flat" @click="configStore.toggleTheme" />
</template>

<style scoped></style>
