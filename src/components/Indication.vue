<script setup lang="ts">
import { useGlobal } from '@/store';
import { nextTick, type Ref, ref, watchEffect } from 'vue';

const globalStore = useGlobal();
const loading = ref(false);
const progress: Ref<number | null> = ref(null);
const snackbarVisibility: Ref<boolean> = ref(false);
const snackbarText = ref('');

// 뒤로가기 및 앞으로가기 이벤트 감지
window.onpopstate = function () {
  // 페이지 이동 시 오버레이 숨기기
  loading.value = false;
};

// 오버레이 가시성 변경 감시
watchEffect(() => {
  loading.value = globalStore.loading;
});

watchEffect(() => {
  progress.value = globalStore.progress;
});

watchEffect(() => {
  snackbarText.value = globalStore.message;
});

watchEffect(() => {
  snackbarVisibility.value = globalStore.message !== '';
});

const onSnackbarChanged = async () => {
  globalStore.setMessage('');
  await nextTick();
};
</script>

<template>
  <!--Loading-->
  <v-overlay
    v-model="loading"
    app
    class="justify-center align-center"
    :persistent="true"
  >
    <v-progress-circular indeterminate size="64" />
  </v-overlay>

  <!--Progress-->
  <v-progress-linear
    v-show="loading"
    :active="loading"
    :indeterminate="progress === null"
    :model-value="progress !== null ? progress : 0"
    color="blue-accent-3"
  />

  <!--Snackbar-->
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
