<script setup lang="ts">
import { useUser } from '@/store';
import { onMounted, ref } from 'vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

import defaultImage from '@/assets/images/empty_avatar.png';

/** Store */
const userStore = useUser();

const user = ref<UserInterface>({});
const fileInput = ref<HTMLInputElement | null>(null); // ref로 선언하고 초기값을 null로 설정
const showCameraIcon = ref(false);

const openFileUploadDialog = () => {
  // 파일 업로드 다이얼로그 열기
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = (event: Event) => {
  // 파일 업로드 처리
  const file = (event.target as HTMLInputElement)?.files?.[0];
  // 여기에서 파일 업로드 및 처리 로직을 추가
};

onMounted(async () => {
  user.value = userStore.user;
});
</script>

<template>
  <v-container>
    <!-- 상단에 프로필 이미지 표시 -->
    <v-row justify="center">
      <v-avatar
        size="150"
        class="ma-3"
        @mouseover="showCameraIcon = true"
        @mouseleave="showCameraIcon = false"
      >
        <v-img :src="user?.profileImage || defaultImage" alt="Default Profile">
          <!-- 카메라 아이콘 -->
          <v-avatar size="40" class="camera-icon" @click="openFileUploadDialog" v-if="showCameraIcon">
            <v-icon color="white">mdi-camera</v-icon>
          </v-avatar>
        </v-img>
      </v-avatar>
      <!-- 파일 업로드 input -->
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        @change="handleFileUpload"
      />
    </v-row>
  </v-container>
</template>

<style scoped>
.camera-icon {
  position: absolute;
  bottom: 50%; /* 수직 중앙 정렬을 위해 하단을 50%로 지정 */
  right: 50%; /* 수평 중앙 정렬을 위해 우측을 50%로 지정 */
  transform: translate(50%, 50%); /* 50%만큼 이동하여 정중앙으로 이동 */
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
