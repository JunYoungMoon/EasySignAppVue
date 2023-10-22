import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import fetchRequest from '@/services/apiService';

/** Config Store */
export default defineStore('user', () => {
  const userInfo: Ref<object> = ref({});

  /**
   * Get User
   */
  const getUserInfo = async () => {
    try {
      const res = await fetchRequest(
        `${import.meta.env.VITE_API_URL}/api/user-info`,
        'POST'
      );

      userInfo.value = await res.json();
    } catch (error) {
      console.error('Error fetching User info :', error);
      throw error;
    }
  };

  return {
    userInfo,
  };
});
