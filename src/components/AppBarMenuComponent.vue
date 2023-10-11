<script setup lang="ts">
import { useConfig } from '@/store';
import { computed } from 'vue';

/** Config Store */
const configStore = useConfig();

const themeIcon = computed(() =>
  configStore.theme ? 'mdi mdi-weather-night' : 'mdi mdi-weather-sunny'
);
</script>

<template>
  <!-- Toggle Dark mode -->
  <v-btn :icon="themeIcon" variant="flat" @click="configStore.toggleTheme" />
</template>
