<script setup lang="ts">
import { useGlobal } from '@/store';
import { nextTick, ref, type Ref, watchEffect } from 'vue';

interface Props {
  loading: boolean;
  progress: number | null;
  snackbarText: string;
}

/** Global Store */
const { message, setMessage } = useGlobal();

/** Snackbar visibility */
const snackbarVisibility: Ref<boolean> = ref(false);

const props = defineProps<Props>();
const snackbarText = ref(props.snackbarText);

watchEffect(() => {
  snackbarVisibility.value = message !== '';
});

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
