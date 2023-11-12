import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type UserInterface from '@/interfaces/UserInterface.ts';

import fetchRequest from '@/services/apiService';

/** User Store */
export default defineStore('user', () => {
  const user: Ref<UserInterface> = ref({});

  /**
   * Get User
   */
  const setUserInfo = async () => {
    try {
      const res: UserInterface = await fetchRequest(
        `${import.meta.env.VITE_API_URL}/api/user-info`,
        'POST'
      );

      if (res) {
        user.value = res;
      }
    } catch (error) {
      console.error('Error fetching User info :', error);
      throw error;
    }
  };

  return {
    user,
    setUserInfo,
  };
});
