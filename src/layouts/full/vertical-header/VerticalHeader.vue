<script setup lang="ts">
import { useCustomizer, useUser } from '@/store';
import { onMounted, type Ref, ref, watch } from 'vue';

import { GridDotsIcon, Menu2Icon } from 'vue-tabler-icons';

import LanguageDD from './LanguageDD.vue';
import ProfileDD from './ProfileDD.vue';
import RightMobileSidebar from './RightMobileSidebar.vue';
import Searchbar from './Searchbar.vue';
import ThemeChange from './ThemeChange.vue';

import type UserInterface from '@/interfaces/UserInterface';

import router from '@/router';

const customizer = useCustomizer();
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

watch(priority, newPriority => {
  priority.value = newPriority;
});

const login = () => {
  void router.push({ name: 'Login' });
};

const user: Ref<UserInterface> = ref({});

onMounted(async () => {
  const userStore = useUser();
  user.value = userStore.user;
});
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="70" class="">
    <v-btn
      class="hidden-md-and-down"
      icon
      color="primary"
      variant="text"
      @click.stop="customizer.setMiniSidebar(!customizer.miniSidebar)"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up"
      icon
      variant="flat"
      size="small"
      @click.stop="customizer.setSidebarDrawer"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    <v-sheet>
      <Searchbar />
    </v-sheet>
    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->
    <LanguageDD />

    <!-- ---------------------------------------------- -->
    <!-- ThemeChange -->
    <!-- ---------------------------------------------- -->
    <ThemeChange />

    <!-- right sidebar -->
    <v-btn
      variant="text"
      color="primary"
      class="hidden-lg-and-up"
      icon
      @click.stop="appsdrawer = !appsdrawer"
    >
      <GridDotsIcon size="17" stroke-width="1.5" />
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <!--    <div class="ml-2">-->
    <ProfileDD v-if="user && Object.keys(user).length !== 0" />
    <v-btn v-else icon class="custom-hover-primary" @click="login">
      <i class="mdi mdi-login" style="font-size: 28px" />
    </v-btn>
    <!--    </div>-->
  </v-app-bar>

  <!-- ---------------------------------------------- -->
  <!-- Right Sidebar -->
  <!-- ---------------------------------------------- -->
  <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
    <RightMobileSidebar />
  </v-navigation-drawer>
</template>
