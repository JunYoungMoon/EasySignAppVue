<script setup lang="ts">
import { useConfig, useAuth, useUser } from '@/store';
import { computed, onMounted, ref } from 'vue';

/** Config Store */
const configStore = useConfig();

/** Theme Icon Change */
const themeIcon = computed(() =>
  configStore.theme ? 'mdi mdi-weather-night' : 'mdi mdi-weather-sunny'
);

const isAuth = ref(false);
const userInfo = ref({});

const login = () => {
  window.location.href = '/login';
};

onMounted(() => {
  isAuth.value = useAuth().isAuth;
  void useUser().setUserInfo();
  userInfo.value = useUser().userInfo;
});
</script>

<template>
  <v-btn v-if="isAuth" id="menu-activator" icon @click="login">
    <i class="mdi mdi-login" style="font-size: 30px" />
    <i class="rounded-image" style="font-size: 30px">
      <img
        v-if="userInfo && userInfo.profileImage"
        :src="userInfo.profileImage"
        alt="Profile Image"
        style="width: 40px; height: 40px"
      />
      <!--          <i v-else class="mdi mdi-account" style="font-size: 30px;"/>-->
      <img
        v-else
        :src="require('~/assets/images/empty_avatar.png')"
        alt="Profile Image"
        style="width: 40px; height: 40px"
      />
      <!--          :image="userInfo && userInfo.profileImage ? userInfo.profileImage : require('~/assets/images/empty_avatar.png')"-->
    </i>
  </v-btn>
  <v-btn v-else icon @click="login">
    <i class="mdi mdi-login" style="font-size: 30px" />
  </v-btn>
  <!-- Toggle Dark mode -->
  <v-btn :icon="themeIcon" variant="flat" @click="configStore.toggleTheme" />
</template>
