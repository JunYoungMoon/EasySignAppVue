<script setup lang="ts">
import { useConfig } from '@/store';
import { computed, onMounted, type ComputedRef } from 'vue';
import { RouterView } from 'vue-router';

import { useTheme } from 'vuetify';

import logo from '@/assets/logo.svg';
// Components
import Indication from '@/components/Indication.vue';

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
  <RouterView />
</template>
