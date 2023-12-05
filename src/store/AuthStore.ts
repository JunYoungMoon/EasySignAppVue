import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type {
  AuthInterface,
  AuthDataInterface,
} from '@/interfaces/AuthInterface';

/** Auth Store */
export default defineStore(
  'auth',
  () => {
    /** Csrf Token */
    const csrfToken: Ref<string> = ref('');

    /** Access Token */
    const accessToken: Ref<string> = ref('');

    /** Refresh Token */
    const refreshToken: Ref<string> = ref('');

    /** Auth Check */
    const isAuth: Ref<boolean> = ref(false);

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

    /**
     * Set Csrf
     */
    const setCsrfToken = (token: string | null) => {
      if (token != null) {
        csrfToken.value = token;
      }
    };

    /**
     * Get Csrf
     */
    const getCsrfToken = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/getcsrf`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();

        csrfToken.value = data.csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
      }
    };

    /**
     * Check authentication permissions.
     *
     * @param type - token type
     * @param csrfToken - csrf token value
     */
    const checkAuth = async (
      type: 'accessToken' | 'refreshToken',
      csrfToken: string
    ) => {
      const token: string =
        type === 'accessToken' ? accessToken.value : refreshToken.value;

      if (!token) {
        isAuth.value = false;
        return;
      }

      try {
        const res: Response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/check-auth`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              'X-XSRF-TOKEN': csrfToken,
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              token,
              csrfToken,
            }),
          }
        );

        const auth: AuthInterface = await res.json();

        const data: AuthDataInterface = JSON.parse(auth.data);

        setCsrfToken(auth.csrfToken);

        if (type === 'accessToken' && data.refreshTokenRequired) {
          await checkAuth('refreshToken', auth.csrfToken);
          isAuth.value = false;
          return;
        }

        if (type === 'refreshToken' && data.accessToken && data.refreshToken) {
          accessToken.value = data.accessToken;
          refreshToken.value = data.refreshToken;
          await checkAuth('accessToken', auth.csrfToken);
          isAuth.value = false;
          return;
        }

        isAuth.value = true;
      } catch (error) {
        console.log('Error checking authentication:', error);
      }
    };

    return {
      csrfToken,
      accessToken,
      refreshToken,
      isAuth,
      setAccessToken,
      setRefreshToken,
      checkAuth,
      getCsrfToken,
      setCsrfToken,
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
