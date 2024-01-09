<script setup lang="ts">
import { useConfig, useAuth, useUser } from '@/store';
import { computed, onMounted, ref } from 'vue';

import LanguageDD from './LanguageDD.vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

import defaultImage from '@/assets/images/empty_avatar.png';
import router from 'src/router';

/** Store */
const configStore = useConfig();
const authStore = useAuth();
const userStore = useUser();

/** Theme Icon Change */
const themeIcon = computed(() =>
  configStore.theme ? 'mdi mdi-weather-night' : 'mdi mdi-weather-sunny'
);

const isAuth = ref(false);
const user = ref<UserInterface>({});
const dropdown = ref(false);

/** Toggle Downdown */
const toggleDropdown = () => {
  dropdown.value = !dropdown.value;
};
const login = () => {
  void router.push({ name: 'Login' });
};

const logout = () => {
  isAuth.value = false;
  authStore.accessToken = '';
  authStore.refreshToken = '';

  void router.push({ name: 'Home' });
};

const myInfo = () => {
  void router.push({ name: 'MyInfo' });
};

onMounted(async () => {
  isAuth.value = authStore.isAuth;
  user.value = userStore.user;
});
</script>

<template>
  <LanguageDD />
  <v-btn v-if="isAuth" id="menu-activator" icon @click="toggleDropdown">
    <div class="rounded-image">
      <img
        :src="user?.profileImage || defaultImage"
        alt="Profile Image"
        class="image"
      />
    </div>
  </v-btn>
  <v-btn v-else icon @click="login">
    <i class="mdi mdi-login" style="font-size: 30px" />
  </v-btn>
  <!-- Toggle Dark mode -->
  <v-btn :icon="themeIcon" variant="flat" @click="configStore.toggleTheme" />

  <!-- Drop Down menu -->
  <v-menu activator="#menu-activator">
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <div class="rounded-image">
            <v-img
              :src="user?.profileImage || defaultImage"
              alt="Profile Image"
              class="image"
            />
          </div>
          <h3 v-if="user?.name">{{ user.name }}</h3>
          <p v-if="user?.email" class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3" />
          <v-btn rounded variant="text" @click="myInfo">My Info</v-btn>
          <v-divider class="my-3" />
          <v-btn rounded variant="text" @click="logout">Logout</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
.rounded-image {
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.image {
  display: block; /* 이미지를 블록 요소로 만들어 가로 중앙 정렬 */
  margin: 0 auto; /* 이미지를 수평으로 가운데 정렬 */
  max-width: 100%; /* 이미지 크기 조절 */
  max-height: 100%;
}
</style>
