import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

/** User Store */
export default defineStore('user', () => {
  const user: Ref<UserInterface> = ref({});

  /**
   * Set User Info
   */
  const setUserInfo = async (userInfo: any) => {
    if (userInfo.profileImage) {
      userInfo.profileImage = userInfo.profileImage;
    }
    user.value = userInfo;
  };

  /**
   * Update User Info
   */
  const updateUserInfo = (newInfo: Partial<UserInterface>) => {
    const updatedInfo = { ...newInfo };

    if (newInfo.profileImage) {
      updatedInfo.profileImage = newInfo.profileImage;
    }

    user.value = { ...user.value, ...updatedInfo };
  };

  return {
    user,
    setUserInfo,
    updateUserInfo,
  };
});
