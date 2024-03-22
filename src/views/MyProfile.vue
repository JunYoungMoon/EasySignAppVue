<script setup lang="ts">
import { useUser, useGlobal, useRule, useErrMsg } from '@/store';
import { ref, onMounted } from 'vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

import defaultImage from '@/assets/images/empty_avatar.png';
import axios from '@/utils/axios';

/** Store */
const userStore = useUser();
const { setMessage } = useGlobal();
const { ruleRequired, ruleNickname } = useRule();
const errMsgStore = useErrMsg();

const user = ref<UserInterface>({});
const fileInput = ref<HTMLInputElement | null>(null);
const nickName = ref<string | undefined>(
  userStore.user.nickName ?? userStore.user.name
);

const submit = async () => {
  // Check if the profile image or nickname has changed
  const hasProfileImageChanged =
    userStore.user.profileImage !== user.value.profileImage;
  const hasNicknameChanged = userStore.user.nickName !== nickName.value;

  if (hasProfileImageChanged || hasNicknameChanged) {
    try {
      const formData = new FormData();

      if (hasProfileImageChanged && fileInput.value?.files?.[0]) {
        formData.append('profileImage', fileInput.value.files[0]);
      }

      if (hasNicknameChanged) {
        formData.append('nickname', nickName.value ?? '');
      }

      // Send API request to update user information
      const res = await axios.post('/api/set-user-info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // If the API request is successful, update the local user information
      if (res.data.status === 'success') {
        const newData: Partial<UserInterface> = {};

        if (res.data.data?.newProfileImage) {
          newData.profileImage = res.data.data.newProfileImage;
        }
        if (res.data.data?.newNickName) {
          newData.nickName = res.data.data.newNickName;
        }
        userStore.updateUserInfo(newData);
      }

      // Optionally show a success message to the user
      setMessage('User information updated successfully');
    } catch (error) {
      // Handle API request error, show an error message, etc.
      setMessage('Failed to update user information');
    }
  } else {
    // No changes, you can optionally show a message to the user
    setMessage('No changes to save');
  }
};

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
    // 5MB 제한
    if (file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = e => {
        user.value.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      setMessage('파일 크기는 5MB 이하여야 합니다.');
    }
  }
};

onMounted(() => {
  // 얕은 복사는 객체의 속성을 새로운 객체로 복사하지만, 내부에 있는 객체나 배열 등의 참조 타입에 대해서는 참조가 복사되므로 같은 객체나 배열을 가리키게 된다.
  // 여기서 user.value.profileImage를 변경해버리면 userStore.user.profileImage도 변경된다.
  // 새로운 객체를 생성하는 얕은 복사
  user.value = { ...userStore.user };
});
</script>

<template>
  <v-container class="w-50">
    <h1 class="text-center pb-3">My info</h1>

    <v-form @submit.prevent="submit">
      <v-row justify="center">
        <!-- 상단에 프로필 이미지 표시 -->
        <div class="avatar-wrapper">
          <v-avatar size="150" class="ma-3">
            <v-img
              :src="user.profileImage ?? defaultImage"
              alt="Default Profile"
            />
          </v-avatar>
          <!-- 카메라 아이콘 -->
          <v-avatar size="40" class="camera-icon" @click="openFileUploadDialog">
            <v-icon color="white">mdi-camera</v-icon>
          </v-avatar>
        </div>
      </v-row>
      <br />
      <v-text-field
        v-model="nickName"
        variant="outlined"
        label="nickName"
        :rules="[ruleRequired, ruleNickname]"
        :error-messages="errMsgStore.getErrorMessages('nickName')"
        @update:model-value="errMsgStore.clearErrorMessage('nickName')"
      />
      <v-btn type="submit" color="primary" :block="true" class="mt-2">
        EDIT
      </v-btn>
    </v-form>
    <label for="fileInput">
      <input
        id="fileInput"
        ref="fileInput"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        style="display: none"
        @change="handleFileUpload"
      />
    </label>
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
