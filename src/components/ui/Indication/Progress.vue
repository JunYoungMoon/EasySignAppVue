<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  loading: boolean;
  progress: number | null;
}

const props = defineProps<Props>();
const loading = ref(props.loading);
const progress = ref(props.progress);
</script>

<template>
  <v-progress-linear
    v-show="loading"
    :active="loading"
    :indeterminate="progress === null"
    :model-value="progress !== null ? progress : 0"
    color="blue-accent-3"
  />
</template>

<style scoped lang="scss"></style>
