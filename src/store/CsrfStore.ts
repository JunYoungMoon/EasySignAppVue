import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import axios from '@/utils/axios';

/** Csrf Store */
export default defineStore(
  'csrf',
  () => {
    /** Csrf Token */
    const csrfToken: Ref<string> = ref('');

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
        const response = await axios.get('/api/getcsrf');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
      }
    };

    return {
      csrfToken,
      getCsrfToken,
      setCsrfToken,
    };
  },
  {
    // Data persistence destination
    persist: {
      key: 'csrf',
      storage: window.sessionStorage,
    },
  }
);
