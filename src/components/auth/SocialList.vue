<script setup lang="ts">
const googleLogin = () => {
  window.location.href = `${
    import.meta.env.VITE_API_URL
  }/oauth2/authorization/google`;
};
const kakaoLogin = () => {
  window.location.href = `${
    import.meta.env.VITE_API_URL
  }/oauth2/authorization/kakao`;
};

const naverLogin = () => {
  window.location.href = `${
    import.meta.env.VITE_API_URL
  }/oauth2/authorization/naver`;
};
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col class="pb-0">
      <v-btn
        variant="outlined"
        style="text-transform: none"
        :block="true"
        prepend-icon="custom:GoogleIcon"
        class="icon-button border text-subtitle-1"
        border
        size="large"
        @click="googleLogin"
      >
        Continue with Google
      </v-btn>
    </v-col>
    <v-col class="pb-0">
      <v-btn
        variant="outlined"
        style="text-transform: none"
        :block="true"
        prepend-icon="custom:KakaoIcon"
        class="icon-button border text-subtitle-1"
        border
        size="large"
        @click="kakaoLogin"
      >
        Continue with Kakao
      </v-btn>
    </v-col>
    <v-col>
      <v-btn
        variant="outlined"
        style="text-transform: none"
        :block="true"
        prepend-icon="custom:NaverIcon"
        class="icon-button border text-subtitle-1"
        border
        size="large"
        @click="naverLogin"
      >
        Continue with Naver
      </v-btn>
    </v-col>
  </v-row>
</template>
