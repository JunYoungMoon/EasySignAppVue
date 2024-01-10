<script setup lang="ts">
import { ref, watchEffect } from 'vue';

interface Props {
  loading: boolean;
}

const props = defineProps<Props>();
const loading = ref(props.loading);

watchEffect(() => {
  // props.loading 값이 변경될 때마다 실행되는 로직
  console.log('props.loading changed:', props.loading);
  loading.value = props.loading;
});
</script>

<template>
  <v-overlay
    v-model="loading"
    app
    class="justify-center align-center"
    :persistent="true"
  >
    <v-progress-circular indeterminate size="64" />
  </v-overlay>
</template>

<style scoped lang="scss"></style>
