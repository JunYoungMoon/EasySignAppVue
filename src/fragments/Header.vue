<script setup lang="ts">
import { useGlobal } from '@/store';
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
  type ComputedRef,
  type Ref,
  type WritableComputedRef,
} from 'vue';
import { useRoute } from 'vue-router';

// Components
import AppBarMenuComponent from '@/components/AppBarMenuComponent.vue';
import DrawerComponent from '@/components/DrawerComponent.vue';

const route = useRoute();

const isLoginPage = route.path === '/login';

/** Global Store */
const globalStore = useGlobal();

/** Title */
const title = import.meta.env.VITE_APP_TITLE ?? 'Vuetify3 Application';

/** drawer visibility */
const drawer: Ref<boolean> = ref(false);

/** loading overlay visibility */
const loading: WritableComputedRef<boolean> = computed({
  get: () => globalStore.loading,
  set: v => globalStore.setLoading(v),
});

/** Appbar progressbar value */
const progress: ComputedRef<number | null> = computed(
  () => globalStore.progress
);

/** Snackbar visibility */
const snackbarVisibility: Ref<boolean> = ref(false);

/** Snackbar text */
const snackbarText: ComputedRef<string> = computed(() => globalStore.message);

// When snackbar text has been set, show snackbar.
watch(
  () => globalStore.message,
  message => (snackbarVisibility.value = message !== '')
);

/** Clear store when snackbar hide */
const onSnackbarChanged = async () => {
  globalStore.setMessage();
  await nextTick();
};

onMounted(() => {
  document.title = title;
});
</script>

<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <drawer-component />
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-app-bar-title tag="h1">{{ $t('vuetify3Application') }}</v-app-bar-title>
    <v-spacer />
    <app-bar-menu-component v-if="!isLoginPage" />
    <v-progress-linear
      v-show="loading"
      :active="loading"
      :indeterminate="progress === null"
      :model-value="progress !== null ? progress : 0"
      color="blue-accent-3"
    />
  </v-app-bar>

  <v-overlay
    v-model="loading"
    app
    class="justify-center align-center"
    :persistent="true"
  >
    <v-progress-circular indeterminate size="64" />
  </v-overlay>

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

<style scoped lang="scss">
// Fix app-bar's progress-bar
.v-app-bar .v-progress-linear {
  position: absolute;
  bottom: 0;
}
</style>
