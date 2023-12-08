<script setup lang="ts">
import { useCustomizer } from '@/store';
import { computed } from 'vue';

import LogoDark from './LogoDark.vue';
import LogoLight from './LogoLight.vue';

const customizer = useCustomizer();

const dark = computed(() => {
  return (
    customizer.actTheme === 'DARK_BLUE_THEME' ||
    customizer.actTheme === 'DARK_AQUA_THEME' ||
    customizer.actTheme === 'DARK_ORANGE_THEME' ||
    customizer.actTheme === 'DARK_PURPLE_THEME' ||
    customizer.actTheme === 'DARK_GREEN_THEME' ||
    customizer.actTheme === 'DARK_CYAN_THEME'
  );
});
</script>
<template>
  <LogoLight v-if="dark" />
  <LogoDark v-else />
</template>
