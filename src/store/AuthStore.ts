import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

/** Auth Store */
export default defineStore(
  'auth',
  () => {
    /** Access Token */
    const accessToken: Ref<string | null> = ref(null);

    /** Refresh Token */
    const refreshToken: Ref<string | null> = ref(null);

    const setAccessToken = (token: string | null) => {
      console.log(token, 'accessToken');
      accessToken.value = token;
    };

    const setRefreshToken = (token: string | null) => {
      console.log(token, 'refreshToken');
      refreshToken.value = token;
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
