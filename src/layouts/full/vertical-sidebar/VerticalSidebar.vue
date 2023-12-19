<script setup lang="ts">
import { useCustomizer } from '@/store';
import { shallowRef } from 'vue';

import Logo from '../logo/Logo.vue';

import NavCollapse from './NavCollapse/NavCollapse.vue';
import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import Profile from './profile/Profile.vue';
import sidebarItems from './sidebarItem';

const customizer = useCustomizer();
const sidebarMenu = shallowRef(sidebarItems);

const handleScrollDisabled = (v: boolean): void => {
  console.log(v);
  if (!v) {
    // Enable scrolling when the menu is closed
    document.documentElement.style.overflow = 'auto';
  }
};
</script>

<template>
  <v-navigation-drawer
    v-model="customizer.sidebarDrawer"
    left
    elevation="0"
    rail-width="75"
    mobile-breakpoint="960"
    class="leftSidebar"
    :rail="customizer.miniSidebar"
    expand-on-hover
    width="270"
    @update:model-value="handleScrollDisabled"
  >
    <!---Logo part -->
    <v-locale-provider>
      <div class="pa-5">
        <Logo />
      </div>
    </v-locale-provider>

    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="pa-6">
        <!---Menu Loop -->
        <template v-for="item in sidebarMenu">
          <!---Item Sub Header -->
          <NavGroup v-if="item.header" :key="item.title" :item="item" />
          <!---If Has Child -->
          <NavCollapse
            v-else-if="item.children"
            class="leftPadding"
            :item="item"
            :level="0"
          />
          <!---Single Item-->
          <NavItem v-else :item="item" class="leftPadding" />
          <!---End Single Item-->
        </template>
      </v-list>
      <div class="pa-6 userbottom">
        <Profile />
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
