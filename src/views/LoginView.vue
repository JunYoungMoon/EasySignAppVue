<script setup lang="ts">
import { useUser, useGlobal, useRule } from '@/store';

const { ruleEmail, rulePassLen, ruleRequired } = useRule();

const googleLogin = () => {
  // 구글 로그인 로직 작성
  window.location.href = `${
    import.meta.env.VITE_API_URL
  }/oauth2/authorization/google`;
};
const kakaoLogin = () => {
  // 카카오 로그인 로직 작성
  window.location.href = `${
    import.meta.env.VITE_API_URL
  }/oauth2/authorization/kakao`;
};

const naverLogin = () => {
  // 네이버 로그인 로직 작성
  window.location.href = `${
    import.meta.env.VITE_API_URL
  }/oauth2/authorization/naver`;
};

const login = () => {};
const loginData = {
  id: '',
  password: '',
};
</script>

<template>
  <v-container>
    <h1 class="text-center pb-3">Login</h1>
    <v-card width="400" class="pa-3 mx-auto">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field
          v-model="loginData.id"
          variant="outlined"
          label="ID"
          :rules="[ruleRequired, ruleEmail]"
        />
        <v-text-field
          v-model="loginData.password"
          variant="outlined"
          label="Password"
          :rules="[ruleRequired, rulePassLen]"
        />
        <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>
        <v-btn type="submit" color="primary" :block="true" class="mt-2">
          Sign in
        </v-btn>
      </v-form>
      <v-row class="pt-2">
        <v-col>
          <div class="text-body-2">
            Don't have an account?
            <a href="#">Sign Up</a>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-1">
          <v-btn
            style="text-transform: none"
            :block="true"
            prepend-icon="custom:GoogleIcon"
            class="icon-button"
            border
            variant="flat"
            size="large"
            @click="googleLogin"
          >
            <v-img src="@/assets/logo.svg" />
            Continue with Google
          </v-btn>
        </v-col>
        <v-col class="pa-1">
          <v-btn
            style="text-transform: none"
            :block="true"
            prepend-icon="custom:KakaoIcon"
            class="icon-button"
            border
            variant="flat"
            size="large"
            @click="kakaoLogin"
          >
            Continue with Kakao
          </v-btn>
        </v-col>
        <v-col class="pa-1">
          <v-btn
            style="text-transform: none"
            :block="true"
            prepend-icon="custom:NaverIcon"
            class="icon-button"
            border
            variant="flat"
            size="large"
            @click="naverLogin"
          >
            Continue with Naver
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
