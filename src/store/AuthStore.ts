import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

/** Auth Store */
export default defineStore(
  'auth',
  () => {
    /** Access Token */
    const accessToken: Ref<string> = ref('');

    /** Refresh Token */
    const refreshToken: Ref<string> = ref('');

    const setAccessToken = (token: string | null) => {
      if (token != null) {
        accessToken.value = token;
      }
    };

    const setRefreshToken = (token: string | null) => {
      if (token != null) {
        refreshToken.value = token;
      }
    };

    return {
      accessToken,
      refreshToken,
      setAccessToken,
      setRefreshToken,
    };
  },
  {
    // Data persistence destination
    persist: {
      key: 'auth',
      storage: window.sessionStorage,
    },
  }
);
