<script setup lang="ts">
import { useUser, useGlobal } from '@/store';
import { onMounted, ref } from 'vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

import defaultImage from '@/assets/images/empty_avatar.png';

/** Store */
const userStore = useUser();
/** Global Store */
const globalStore = useGlobal();

// 로딩을 키고 끄는 함수
// const showLoading = () => {
//   globalStore.setLoading(true); // 로딩을 활성화
// };
//
// const hideLoading = () => {
//   globalStore.setLoading(false); // 로딩을 비활성화
// };

const user = ref<UserInterface>({});
const fileInput = ref<HTMLInputElement | null>(null); // ref로 선언하고 초기값을 null로 설정

const openFileUploadDialog = () => {
  // 파일 업로드 다이얼로그 열기
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement?.files?.[0];

  if (file) {
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB 제한
      const reader = new FileReader();
      reader.onload = e => {
        user.value.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      globalStore.setMessage('파일 크기는 5MB 이하여야 합니다.');
    }
  }
};

onMounted(() => {
  user.value = userStore.user;
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <!-- 상단에 프로필 이미지 표시 -->
      <div class="avatar-wrapper">
        <v-avatar size="150" class="ma-3">
          <v-img
            :src="user?.profileImage || defaultImage"
            alt="Default Profile"
          />
        </v-avatar>
        <!-- 카메라 아이콘 -->
        <v-avatar size="40" class="camera-icon" @click="openFileUploadDialog">
          <v-icon color="white">mdi-camera</v-icon>
        </v-avatar>
      </div>
      <!-- 파일 업로드 input -->
      <input
        ref="fileInput"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        style="display: none"
        @change="handleFileUpload"
      />
    </v-row>
  </v-container>
</template>

<style scoped>
.avatar-wrapper {
  position: relative;
  overflow: visible;
}

.camera-icon {
  position: absolute;
  bottom: 18px;
  right: 18px;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
}
</style>
