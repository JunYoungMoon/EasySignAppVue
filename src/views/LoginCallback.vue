<script setup lang="ts">
import { useAuth } from '@/store';
import { onMounted } from 'vue';

onMounted(() => {
  // URL 파라미터 문자열 가져오기
  const queryString = window.location.search;

  // URLSearchParams 객체를 사용하여 파라미터 해석
  const urlParams = new URLSearchParams(queryString);

  // 파라미터 값 가져오기
  const accessToken: string | null = urlParams.get('accessToken');
  const refreshToken: string | null = urlParams.get('refreshToken');

  useAuth().setAccessToken(accessToken);
  useAuth().setRefreshToken(refreshToken);

  window.location.href = '/';
});
</script>

<template></template>
