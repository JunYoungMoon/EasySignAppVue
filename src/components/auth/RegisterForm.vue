<script setup lang="ts">
import { useGlobal, useRule } from '@/store';
import { ref } from 'vue';

import axios from '@/utils/axios';

const { ruleRequired, ruleNickname, rulePassLen, ruleEmail, ruleCode } =
  useRule();
const { setMessage } = useGlobal();

const valid = ref(false);
const password = ref('');
const email = ref('');
const code = ref('');
const name = ref('');

const sendEmail = async () => {
  const res = await axios.post('/api/send-email-code', {
    email: email.value,
  });

  setMessage(res.data.msg);

  console.log(res);
};

const emailVerification = async () => {
  const res = await axios.post('/api/email-verification', {
    email: email.value,
    authCode: code.value,
  });

  setMessage(res.data.msg);

  console.log(res);
};

const submit = async () => {
  const res = await axios.post('/api/signup', {
    email: email.value,
    name: name.value,
    password: password.value,
  });

  console.log(res);
};
</script>
<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="mt-5"
    @submit="submit"
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
          style="height: 56px"
          class="mt-2"
          @click="sendEmail"
        >
          Send Code
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
          :disabled="!(ruleCode(code) === true && ruleCode(code) === true)"
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
      :counter="10"
      :rules="[ruleRequired, rulePassLen]"
      variant="outlined"
      type="password"
      color="primary"
    />
    <v-btn
      size="large"
      class="mt-2"
      color="primary"
      block
      type="submit"
      variant="flat"
      :disabled="!valid"
    >
      Sign Up
    </v-btn>
  </v-form>
</template>
