<script setup lang="ts">
import { useConfig, useAuth, useUser } from '@/store';
import { computed, onMounted, ref } from 'vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

import defaultImage from '@/assets/images/empty_avatar.png';

/** Store */
const configStore = useConfig();
const authStore = useAuth();
const userStore = useUser();


const isAuth = ref(false);
const user = ref<UserInterface>({});
const dropdown = ref(false);

onMounted(async () => {
  isAuth.value = authStore.isAuth;

  await userStore.setUserInfo();

  user.value = userStore.user;
});
</script>

<template>
  <v-container>
    <!-- 상단에 프로필 이미지 표시 -->
    <v-row justify="center">
      <v-avatar size="150" class="ma-3">
        <v-img
          v-if="user && user.profileImage"
          :src="user.profileImage"
          alt="Default Profile"
        >
          <!-- 카메라 아이콘 -->
          <v-avatar
            size="40"
            class="camera-icon"
            v-if="!isUploading"
            @click="openFileUploadDialog"
          >
            <v-icon color="white">mdi-camera</v-icon>
          </v-avatar>
        </v-img>
      </v-avatar>
      <!-- 파일 업로드 input -->
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileUpload"
      />
    </v-row>
  </v-container>
</template>

<style scoped>
.camera-icon {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
