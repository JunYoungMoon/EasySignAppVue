<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  loading: boolean;
}

const props = defineProps<Props>();
const loading = ref(props.loading);
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
