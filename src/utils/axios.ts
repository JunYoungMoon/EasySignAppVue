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

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    const { refreshToken } = authStore;

    csrfStore.setCsrfToken(response.data.csrfToken);

    // 응답이 refreshTokenRequired를 가지고 있다면 토큰을 갱신
    if (refreshToken && response.data?.refreshTokenRequired) {
      const originalRequest = response.config;
      originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
      return await axiosServices(originalRequest);
    }

    // 백엔드에서 인증 권한이 없을때, 프론트엔드 로그인 페이지로 이동
    if (
      response.data === 'Authentication failed or insufficient permissions.'
    ) {
      await router.push({ name: 'Login' });
    }

    // refreshTokenRequired가 없는 경우 그냥 응답 반환
    return response;
  },
  async error => {
    const { setMessage, setLoading } = useGlobal();

    setMessage('An unknown error has occurred.');
    setLoading(false);
    // location.reload();
    // throw new Error(error);
    console.log(error.response.data);
    return await Promise.reject(error);
  }
);

export default axiosServices;
