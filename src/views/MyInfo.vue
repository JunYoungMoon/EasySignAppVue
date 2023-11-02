<script setup lang="ts">
import { useUser } from '@/store';
import { onMounted, ref } from 'vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

import defaultImage from '@/assets/images/empty_avatar.png';

/** Store */
const userStore = useUser();

const user = ref<UserInterface>({});

const openFileUploadDialog = () => {
  // 파일 업로드 input 요소를 클릭합니다.
  const fileInput = ref<HTMLInputElement | null>(null);
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const selectedFile = fileInput.files?.[0];

  if (selectedFile) {
    // 여기에서 선택한 파일을 업로드하고 프로필 이미지를 업데이트하는 로직을 구현합니다.
    // 이 부분은 프로젝트에 따라 서버와의 통신 또는 클라이언트 측 로컬 저장소를 사용하여 업로드 및 업데이트를 처리해야 합니다.
  }
};
onMounted(async () => {
  user.value = userStore.user;
});
</script>

<template>
  <v-container>
    <!-- 상단에 프로필 이미지 표시 -->
    <v-row justify="center">
      <v-avatar size="150" class="ma-3">
        <v-img :src="user?.profileImage || defaultImage" alt="Default Profile">
          <!-- 카메라 아이콘 -->
          <v-avatar size="40" class="camera-icon" @click="openFileUploadDialog">
            <v-icon color="white">mdi-camera</v-icon>
          </v-avatar>
        </v-img>
      </v-avatar>
      <!-- 파일 업로드 input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
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
