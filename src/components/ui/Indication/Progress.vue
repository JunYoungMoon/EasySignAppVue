<script setup lang="ts">
import { ref, watchEffect } from 'vue';

interface Props {
  loading: boolean;
  progress: number | null;
}

const props = defineProps<Props>();
const loading = ref(props.loading);
const progress = ref(props.progress);

watchEffect(() => {
  // props.loading 값이 변경될 때마다 실행되는 로직
  console.log('props.loading changed:', props.loading);
  loading.value = props.loading;
  progress.value = props.progress;
});
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
