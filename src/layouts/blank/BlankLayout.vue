<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
<template>
  <v-locale-provider>
    <v-app>
      <RouterView />
    </v-app>
  </v-locale-provider>
</template>
