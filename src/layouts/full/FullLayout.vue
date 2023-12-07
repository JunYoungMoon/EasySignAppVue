<script setup lang="ts">
import { RouterView } from 'vue-router';

import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
</script>

<template>
  <v-locale-provider>
    <v-app>
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
