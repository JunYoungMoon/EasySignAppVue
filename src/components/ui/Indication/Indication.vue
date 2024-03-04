<script setup lang="ts">
import { useGlobal } from '@/store';
import {
  computed,
  type ComputedRef,
  ref,
  watch,
  watchEffect,
  type WritableComputedRef,
} from 'vue';

import Loading from './Loading.vue';
import Progress from './Progress.vue';
import SnackBar from './SnackBar.vue';

/** Global Store */
// const globalStore = useGlobal();
//
// /** loading overlay visibility */
// const loading: WritableComputedRef<boolean> = computed({
//   get: () => globalStore.loading,
//   set: v => globalStore.setLoading(v),
// });

const globalStore = useGlobal();
const loading = ref(globalStore.loading);

watch(
  () => globalStore.loading,
  newValue => {
    console.log('props.loading changed:', newValue);

    loading.value = newValue;
  }
);

/** Appbar progressbar value */
const progress: ComputedRef<number | null> = computed(
  () => globalStore.progress
);

/** Snackbar text */
const snackbarText: ComputedRef<string> = computed(() => globalStore.message);
</script>

<template>
  <Loading :loading="loading" />
  <!--  <Progress :loading="loading" :progress="progress" />-->
  <!--  <SnackBar :snackbar-text="snackbarText" />-->
</template>
