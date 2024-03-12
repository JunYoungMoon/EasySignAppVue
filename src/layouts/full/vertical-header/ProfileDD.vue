<script setup lang="ts">
import { useAuth, useUser } from '@/store';

import { MailIcon } from 'vue-tabler-icons';

import type UserInterface from '@/interfaces/UserInterface';

import { profileDD } from '@/_mockApis/headerData';
import defaultImage from '@/assets/images/empty_avatar.png';

defineProps({
  user: {
    type: Object as () => UserInterface,
    required: true,
  },
});

const authStore = useAuth();
const userStore = useUser();

const logout = () => {
  authStore.accessToken = '';
  authStore.refreshToken = '';
  void userStore.setUserInfo({});

  location.reload();
};
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- Profile DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template #activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar size="35">
          <v-img :src="user?.profileImage || defaultImage" width="35" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="360" elevation="10">
      <div class="px-8 pt-6">
        <h6 class="text-h5 font-weight-medium">User Profile</h6>
        <div class="d-flex align-center mt-4 pb-6">
          <v-avatar size="80">
            <v-img :src="user?.profileImage || defaultImage" width="80" />
          </v-avatar>
          <div class="ml-3">
            <h6 class="text-h6 mb-n1">
              {{ user?.nickName || user?.name }}
            </h6>
            <!--            <span class="text-subtitle-1 font-weight-regular textSecondary">-->
            <!--              Designer-->
            <!--            </span>-->
            <div class="d-flex align-center mt-2">
              <MailIcon size="18" stroke-width="1.5" />
              <span
                class="text-subtitle-1 font-weight-regular textSecondary ml-2"
              >
                {{ user?.email }}
              </span>
            </div>
          </div>
        </div>
        <v-divider />
      </div>
      <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px">
        <v-list class="py-0 theme-list" lines="two">
          <v-list-item
            v-for="item in profileDD"
            :key="item.title"
            class="py-4 px-8 custom-text-primary"
            :to="item.href"
          >
            <template #prepend>
              <v-avatar
                size="48"
                color="lightprimary"
                class="mr-3"
                rounded="md"
              >
                <v-img
                  :src="item.avatar"
                  width="24"
                  height="24"
                  :alt="item.avatar"
                />
              </v-avatar>
            </template>
            <div>
              <h6 class="text-subtitle-1 font-weight-bold mb-2 custom-title">
                {{ item.title }}
              </h6>
            </div>
            <p class="text-subtitle-1 font-weight-regular textSecondary">
              {{ item.subtitle }}
            </p>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
      <div class="pt-4 pb-6 px-8 text-center">
        <v-btn color="primary" variant="outlined" block @click="logout">
          Logout
        </v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>
