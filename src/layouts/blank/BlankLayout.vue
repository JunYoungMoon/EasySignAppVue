<script setup lang="ts">
import { RouterView } from 'vue-router';

import Indication from '@/components/Indication.vue';
</script>
<template>
  <v-locale-provider>
    <v-app>
      <RouterView />
      <!-- Loading, Progress, Snackbar -->
      <Indication />
    </v-app>
  </v-locale-provider>
</template>
