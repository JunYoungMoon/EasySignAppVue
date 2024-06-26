<script setup lang="ts">
import { useGlobal, useRule } from '@/store';
import { ref } from 'vue';

import CryptoJS from 'crypto-js';

import router from '@/router';
import axios from '@/utils/axios';

const { ruleRequired, ruleNickname, rulePass, ruleEmail, ruleCode } = useRule();
const { setMessage } = useGlobal();

const valid = ref(false);
const passwordShow = ref(false);
const password = ref('');
const email = ref('');
const code = ref('');
const name = ref('');
const sendCodeDisabled = ref(false); // Send Code 버튼 활성화 여부
const sendCodeCountdownMinutes = ref(0); // Send Code 카운트 다운 분
const sendCodeCountdownSeconds = ref(0); // Send Code 카운트 다운 초
const verifyDisabled = ref(false); // Verify 버튼 활성화 여부
let countdownInterval: ReturnType<typeof setInterval>;

const sendEmail = async () => {
  const checksum = CryptoJS.SHA256(`${email.value}${code.value}`).toString();

  const res = await axios.post('/api/mail/send', {
    email: email.value,
    checkSum: checksum, // 생성한 체크섬을 서버로 전송
  });

  setMessage(res.data.msg);

  if (res.data.status === 'success') {
    clearInterval(countdownInterval); // 인터벌 멈춤

    // Send Code 버튼을 비활성화하고 카운트 다운 시작
    sendCodeDisabled.value = true;
    sendCodeCountdownMinutes.value = 3; // 3분
    sendCodeCountdownSeconds.value = 0;
    verifyDisabled.value = false; // Verify 버튼 활성화

    // 1초마다 카운트 다운
    countdownInterval = setInterval(() => {
      if (sendCodeCountdownSeconds.value > 0) {
        sendCodeCountdownSeconds.value--;
      } else {
        sendCodeCountdownMinutes.value--;
        sendCodeCountdownSeconds.value = 59;
      }

      if (
        sendCodeCountdownMinutes.value === 0 &&
        sendCodeCountdownSeconds.value === 0
      ) {
        // 타이머가 종료되면 Send Code 버튼을 다시 활성화하고 타이머를 정리
        clearInterval(countdownInterval);
        sendCodeDisabled.value = false;
      }
    }, 1000);
  }
};

const emailVerification = async () => {
  const res = await axios.post('/api/mail/verify', {
    email: email.value,
    authCode: code.value,
  });

  setMessage(res.data.msg);

  if (res.data.status === 'success') {
    clearInterval(countdownInterval); // 인터벌 멈춤
    sendCodeDisabled.value = false; // Send Code 버튼 활성화
    sendCodeCountdownMinutes.value = 0; // 카운트 초기화
    sendCodeCountdownSeconds.value = 0; // 카운트 초기화

    verifyDisabled.value = true; // Verify 버튼 비활성화
  }
};

const submit = async () => {
  const res = await axios.post('/api/users', {
    email: email.value,
    name: name.value,
    password: password.value,
  });

  setMessage(res.data.msg);

  if (res.data.status === 'success') {
    // 회원가입 성공 시 로그인 페이지로 이동
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(async () => {
      await router.push('/auth/login');
    }, 3000);
  }
};
</script>
<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="mt-5"
    @submit.prevent="submit"
  >
    <v-row align="center" class="d-flex justify-center">
      <!-- 이메일 입력 -->
      <v-col cols="8">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">
          Email Address
        </v-label>
        <VTextField v-model="email" :rules="[ruleRequired, ruleEmail]" />
      </v-col>

      <!-- 이메일 인증 코드 전송 버튼 -->
      <v-col cols="4" class="pl-0">
        <v-btn
          size="large"
          color="primary"
          :disabled="
            !(ruleEmail(email) === true && ruleRequired(email) === true)
          "
          style="height: 56px; width: 120px"
          class="mt-2"
          @click="sendEmail"
        >
          <template
            v-if="sendCodeCountdownMinutes > 0 || sendCodeCountdownSeconds > 0"
          >
            {{
              `${sendCodeCountdownMinutes}:${
                sendCodeCountdownSeconds < 10
                  ? '0' + sendCodeCountdownSeconds
                  : sendCodeCountdownSeconds
              }`
            }}
          </template>
          <template v-else>Send Code</template>
        </v-btn>
      </v-col>
    </v-row>

    <v-row align="center" class="d-flex justify-center mt-0">
      <!-- 이메일 인증 코드 입력 -->
      <v-col cols="8">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">
          Email Verification Code
        </v-label>
        <VTextField v-model="code" :rules="[ruleRequired, ruleCode]" />
      </v-col>

      <!-- 이메일 인증 코드 전송 버튼 -->
      <v-col cols="4" class="pl-0">
        <v-btn
          size="large"
          color="primary"
          :disabled="
            !(ruleCode(code) === true && ruleCode(code) === true) ||
            verifyDisabled === true
          "
          style="height: 56px; width: 100%"
          class="mt-2"
          @click="emailVerification"
        >
          Verify
        </v-btn>
      </v-col>
    </v-row>

    <!--    <v-label class="text-subtitle-1 font-weight-medium pb-2">Name</v-label>-->
    <v-tooltip location="right">
      <template #activator="{ props }">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">
          Name
          <v-icon class="ml-1" v-bind="props">mdi-help-circle</v-icon>
        </v-label>
      </template>
      <span>
        The name serves as your nickname and can be modified on the user page.
      </span>
    </v-tooltip>

    <VTextField v-model="name" :rules="[ruleRequired, ruleNickname]" />

    <v-label class="text-subtitle-1 font-weight-medium pb-2">Password</v-label>
    <VTextField
      v-model="password"
      :append-inner-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
      :counter="30"
      :rules="[ruleRequired, rulePass]"
      variant="outlined"
      :type="passwordShow ? 'text' : 'password'"
      color="primary"
      @click:append-inner="passwordShow = !passwordShow"
    />
    <v-btn
      size="large"
      class="mt-2"
      color="primary"
      block
      type="button"
      variant="flat"
      :disabled="!valid"
      @click="submit"
    >
      Sign Up
    </v-btn>
  </v-form>
</template>
