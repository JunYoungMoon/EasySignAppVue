<script setup lang="ts">
import { useConfig, useCustomizer } from '@/store';
import { computed, type ComputedRef } from 'vue';
import { RouterView } from 'vue-router';

import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';

const customizer = useCustomizer();
/** Config Store */
const configStore = useConfig();
/** Toggle Dark mode */
const isDark: ComputedRef<string> = computed(() =>
  configStore.theme ? 'DARK_BLUE_THEME' : 'BLUE_THEME'
);
</script>

<template>
  <v-locale-provider>
    <v-app
      :theme="isDark"
      :class="[customizer.miniSidebar ? 'mini-sidebar' : '']"
    >
      <VerticalSidebarVue />
      <VerticalHeaderVue />
      <v-main>
        <v-container fluid class="page-wrapper pb-sm-15 pb-10">
          <div class="maxWidth">
            <RouterView />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
