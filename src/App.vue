<script setup lang="ts">
import { useConfig } from '@/store';
import { computed, onMounted, type ComputedRef } from 'vue';
import { RouterView } from 'vue-router';

import { useTheme } from 'vuetify';

import logo from '@/assets/logo.svg';
// Components
import Indication from '@/components/ui/Indication/Indication.vue';

/** Vuetify Theme */
const theme = useTheme();

/** Config Store */
const configStore = useConfig();

/** Title */
const title = import.meta.env.VITE_APP_TITLE ?? 'Vuetify3 Application';

/** Toggle Dark mode */
const isDark: ComputedRef<string> = computed(() =>
  configStore.theme ? 'dark' : 'light'
);

onMounted(() => {
  document.title = title;
});

const jsonLd = JSON.stringify(
  {
    '@schema': 'https://json.schemastore.org/jsonld.json',
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'Vite Vue3 Vuetify3 Easy Sign up',
    url: 'https://github.com/JunYoungMoon/EasySignAppVue',
    description: 'Vite Vue3 Vuetify3 Easy Sign up Demo',
  },
  null,
  2
);
</script>

<template>
  <RouterView />
  <!--  <v-locale-provider>-->
  <!--    <v-app :theme="isDark">-->
  <!--      <v-main>-->
  <!--        &lt;!&ndash; Multiple layouts https://analogcode.tistory.com/40 &ndash;&gt;-->
  <!--        <component :is="$route.meta.layout || 'div'">-->
  <!--          <router-view />-->
  <!--        </component>-->

  <!--        &lt;!&ndash; Single layout&ndash;&gt;-->
  <!--        &lt;!&ndash;   <router-view v-slot="{ Component, route }">&ndash;&gt;-->
  <!--        &lt;!&ndash;     <component&ndash;&gt;-->
  <!--        &lt;!&ndash;       :is="Component"&ndash;&gt;-->
  <!--        &lt;!&ndash;       :key="route.name"&ndash;&gt;-->
  <!--        &lt;!&ndash;     />&ndash;&gt;-->
  <!--        &lt;!&ndash;   </router-view>&ndash;&gt;-->
  <!--      </v-main>-->
  <!--    </v-app>-->
  <!--  </v-locale-provider>-->
  <teleport to="head">
    <meta
      name="theme-color"
      :content="theme.computedThemes.value[isDark].colors.primary"
    />
    <meta
      name="keyword"
      content="template,typescript,vue3,vuetify,vite,vite-template,volar"
    />
    <meta name="description" content="Vite Vue3 Vuetify3 Easy Sign up Demo" />
    <component :is="'script'" type="application/ld+json">
      {{ jsonLd }}
    </component>
    <link rel="icon" :href="logo" type="image/svg+xml" />
  </teleport>
  <!-- Loading, Progress, Snackbar -->
  <Indication />
</template>

<style lang="scss">
@use 'vuetify/_settings';

html {
  // Fix always scrollbar shown.
  overflow-y: auto;
  // Modern scrollbar style
  scrollbar-width: thin;
  scrollbar-color: map-get(settings.$grey, 'lighten-2')
    map-get(settings.$grey, 'base');
}

::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  background-color: map-get(settings.$grey, 'lighten-2');
}

::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: map-get(settings.$grey, 'base');
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

// Fixed a bug that the theme color is interrupted when scrolling
.v-application {
  overflow-y: auto;
}
</style>
