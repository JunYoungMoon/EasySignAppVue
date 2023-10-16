<script setup lang="ts">
import { type Ref, ref } from 'vue';

const errorMessage: Ref<string> = ref('404 Not Found');
</script>

<template>
  <h1>{{ errorMessage }}</h1>
</template>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
