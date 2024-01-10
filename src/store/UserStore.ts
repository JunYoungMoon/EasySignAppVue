import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

/** User Store */
export default defineStore('user', () => {
  const user: Ref<UserInterface> = ref({});

  /**
   * Get User
   */
  const setUserInfo = async (userInfo: any) => {
    user.value = userInfo;
  };

  return {
    user,
    setUserInfo,
  };
});
