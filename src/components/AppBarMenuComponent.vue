<script setup lang="ts">
import {useConfig, useAuth, useUser} from '@/store';
import {computed, onMounted, ref} from 'vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

/** Config Store */
const configStore = useConfig();

/** Theme Icon Change */
const themeIcon = computed(() =>
  configStore.theme ? 'mdi mdi-weather-night' : 'mdi mdi-weather-sunny'
);

const isAuth = ref(false);
const user = ref<UserInterface>({});

const login = () => {
  window.location.href = '/login';
};

onMounted(async () => {
  const authStore = useAuth();
  const userStore = useUser();

  isAuth.value = authStore.isAuth;

  await userStore.setUserInfo();

  user.value = userStore.user;
  if (user.value) {
    console.log(user.value.email);
  }
});
</script>

<template>
  <v-btn v-if="isAuth" id="menu-activator" icon @click="login">
    <div class="rounded-image">
      <img
        v-if="user && user.profileImage"
        :src="user.profileImage"
        alt="Profile Image"
        class="image"
      />
      <img
        v-else
        src="@/assets/images/empty_avatar.png"
        alt="Profile Image"
        class="image"
      />
    </div>
  </v-btn>
  <v-btn v-else icon @click="login">
    <i class="mdi mdi-login" style="font-size: 30px"/>
  </v-btn>
  <!-- Toggle Dark mode -->
  <v-btn :icon="themeIcon" variant="flat" @click="configStore.toggleTheme"/>
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
