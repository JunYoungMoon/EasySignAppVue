import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type AuthResponse from '@/interfaces/AuthInterface';

/** Config Store */
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

    const userInfo: Ref<object> = ref({});

    /**
     * Set Csrf
     */
    const setCsrfToken = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/getcsrf`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();

        csrfToken.value = data.token;
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
          `${import.meta.env.VITE_API_URL}/check-auth`,
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

        const auth: AuthResponse = await res.json();

        if (type === 'accessToken' && auth.refreshTokenRequired) {
          await checkAuth('refreshToken', csrfToken);
          isAuth.value = false;
          return;
        }

        if (type === 'refreshToken' && auth.accessToken && auth.refreshToken) {
          accessToken.value = auth.accessToken;
          refreshToken.value = auth.refreshToken;
          await checkAuth('accessToken', csrfToken);
          isAuth.value = false;
          return;
        }

        console.log('check-auth :', auth);

        return auth;
      } catch (error) {
        console.log('Error checking authentication:', error);
        return false;
      }
    };
    //
    // /**
    //  * Check authentication permissions.
    //  *
    //  * @param type - token type
    //  * @param csrfToken - csrf token value
    //  */
    // const getUserInfo = async (){
    //
    // }

    return {
      csrfToken,
      accessToken,
      refreshToken,
      isAuth,
      checkAuth,
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
