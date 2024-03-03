<script setup lang="ts">
import { useGlobal } from '@/store';
import { computed, type ComputedRef, type WritableComputedRef } from 'vue';

import Loading from './Loading.vue';
import Progress from './Progress.vue';
import SnackBar from './SnackBar.vue';

/** Global Store */
const globalStore = useGlobal();

/** loading overlay visibility */
const loading: WritableComputedRef<boolean> = computed({
  get: () => globalStore.loading,
  set: v => globalStore.setLoading(v),
});

/** Appbar progressbar value */
const progress: ComputedRef<number | null> = computed(
  () => globalStore.progress
);

/** Snackbar text */
const snackbarText: ComputedRef<string> = computed(() => globalStore.message);
</script>

<template>
  <!--  <Loading :loading="loading" />-->
  <!--  <Progress :loading="loading" :progress="progress" />-->
  <!--  <SnackBar :snackbar-text="snackbarText" />-->
</template>

<style scoped></style>
