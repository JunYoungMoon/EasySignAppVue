<script setup lang="ts">
import { useGlobal } from '@/store';
import {
  computed,
  nextTick,
  ref,
  watch,
  type ComputedRef,
  type Ref,
} from 'vue';

/** Global Store */
const { message, setMessage } = useGlobal();

/** Snackbar visibility */
const snackbarVisibility: Ref<boolean> = ref(false);

/** Snackbar text */
const snackbarText: ComputedRef<string> = computed(() => message);

// When snackbar text has been set, show snackbar.
watch(
  () => message,
  message => (snackbarVisibility.value = message !== '')
);

/** Clear store when snackbar hide */
const onSnackbarChanged = async () => {
  setMessage();
  await nextTick();
};
</script>

<template>
  <v-snackbar
    v-model="snackbarVisibility"
    @update:model-value="onSnackbarChanged"
  >
    {{ snackbarText }}
    <template #actions>
      <v-btn icon="mdi-close" @click="onSnackbarChanged" />
    </template>
  </v-snackbar>
</template>

<style scoped lang="scss"></style>
