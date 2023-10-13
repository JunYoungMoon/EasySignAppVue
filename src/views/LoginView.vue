<script setup lang="ts">
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
  <v-card width="400" class="pa-3 mx-auto">
    <v-form fast-fail @submit.prevent="login">
      <v-text-field v-model="loginData.id" variant="outlined" label="ID" />
      <v-text-field
        v-model="loginData.password"
        variant="outlined"
        label="Password"
      />
      <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>
      <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
    </v-form>
    <div class="mt-2">
      <p class="text-body-2">
        Don't have an account?
        <a href="#">Sign Up</a>
      </p>
    </div>

    <v-row>
      <v-btn>
        <v-icon icon="custom:GoogleIcon" />
        Button
      </v-btn>

      <v-col class="pa-0">
        <v-img
          src="@/assets/social/google.png"
          style="cursor: pointer"
          @click="googleLogin"
        />
      </v-col>
      <v-col class="pa-1">
        <v-img
          src="@/assets/social/kakao.png"
          style="cursor: pointer"
          @click="kakaoLogin"
        />
      </v-col>
      <v-col class="pa-1">
        <v-img
          src="@/assets/social/naver.png"
          style="cursor: pointer"
          @click="naverLogin"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
