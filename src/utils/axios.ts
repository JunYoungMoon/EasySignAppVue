import { useAuth, useCsrf, useGlobal } from '@/store';

import axios, { type AxiosProgressEvent, type AxiosResponse } from 'axios';

import router from '@/router';
import i18n from '@/utils/locales/i18n';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

const axiosServices = axios.create({
  baseURL: baseUrl,
});

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.onUploadProgress = (progressEvent: AxiosProgressEvent): void => {
  const globalStore = useGlobal();
  if (progressEvent.progress && progressEvent.total) {
    globalStore.setProgress(
      Math.round((progressEvent.loaded * 100) / progressEvent.total)
    );
  } else {
    globalStore.setProgress(null);
  }
};
axios.defaults.onDownloadProgress = (
  progressEvent: AxiosProgressEvent
): void => {
  const globalStore = useGlobal();
  if (progressEvent.progress && progressEvent.total) {
    globalStore.setProgress(
      Math.round((progressEvent.loaded * 100) / progressEvent.total)
    );
  } else {
    globalStore.setProgress(null);
  }
};

// interceptor for http
axiosServices.interceptors.request.use(
  async config => {
    const { setLoading } = useGlobal();
    setLoading(true);

    config.withCredentials = true;

    const csrfStore = useCsrf();
    const authStore = useAuth();
    const { accessToken } = authStore;
    const { csrfToken } = csrfStore;

    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    if (config.headers.X_Refresh_Token_Required) {
      /* empty */
    } else {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    config.headers['Accept-Language'] = i18n.global.locale;

    return config;
  },
  async error => {
    // 요청이 실패한 경우 처리할 작업을 추가합니다.
    return await Promise.reject(error);
  }
);
axiosServices.interceptors.response.use(
  async (response: AxiosResponse<any, any>) => {
    const { setLoading } = useGlobal();
    setLoading(false);

    const authStore = useAuth();
    const csrfStore = useCsrf();
    const { refreshToken, setAccessToken, setRefreshToken } = authStore;

    csrfStore.setCsrfToken(response.data.csrfToken);

    // 백엔드에서 refresh 토큰을 요청
    if (
      refreshToken &&
      response.data.msg === 'Please provide a refresh token.'
    ) {
      const originalRequest = response.config;
      originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
      originalRequest.headers.X_Refresh_Token_Required = true;

      return await axiosServices(originalRequest);
    }

    // 백엔드에서 인증 권한이 없을때, 프론트엔드 로그인 페이지로 이동
    if (
      response.data.msg === 'Authentication failed or insufficient permissions.'
    ) {
      setAccessToken(null);
      setRefreshToken(null);
      await router.push({ name: 'Login' });
    }

    // refresh로 새로운 토큰을 얻었을때 저장
    if (response.data.msg === 'A new token has been created.') {
      console.log(response.data);
      setAccessToken(response.data.data.accessToken);
      setRefreshToken(response.data.data.refreshToken);

      const originalRequest = response.config;
      originalRequest.headers.X_Refresh_Token_Required = false;

      return await axiosServices(originalRequest);
    }

    return response;
  },
  async error => {
    const { setMessage, setLoading } = useGlobal();

    setMessage('An unknown error has occurred.');
    setLoading(false);
    return await Promise.reject(error);
  }
);

export default axiosServices;
