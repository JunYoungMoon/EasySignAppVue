<script setup lang="ts">
import { useAuth, useGlobal, useRule } from '@/store';
import { ref } from 'vue';

/* Social icons */
import facebook from '@/assets/images/svgs/facebook-icon.svg';
import google from '@/assets/images/svgs/google-icon.svg';
import router from '@/router';
import axios from '@/utils/axios';

const { ruleRequired, rulePass, ruleEmail } = useRule();
const { setMessage } = useGlobal();
const { setAccessToken, setRefreshToken } = useAuth();

const valid = ref(false);
const checkbox = ref(false);
const passwordShow = ref(false);
const password = ref('');
const email = ref('');

const submit = async () => {
  const res = await axios.post('/api/login', {
    email: email.value,
    password: password.value,
  });

  if (res.data.status === 'success') {
    setAccessToken(res.data.data.accessToken);
    setRefreshToken(res.data.data.refreshToken);

    await router.push('/');
  } else {
    setMessage(res.data.msg);
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
    @keyup.enter="submit"
  >
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Email
    </v-label>
    <VTextField v-model="email" :rules="[ruleRequired, ruleEmail]" />
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Password
    </v-label>
    <VTextField
      v-model="password"
      :append-inner-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[ruleRequired, rulePass]"
      variant="outlined"
      :type="passwordShow ? 'text' : 'password'"
      color="primary"
      @click:append-inner="passwordShow = !passwordShow"
    />
    <div class="d-flex flex-wrap align-center my-3 ml-n2">
      <v-checkbox v-model="checkbox" required hide-details color="primary">
        <template #label>Remeber this Device</template>
      </v-checkbox>
      <div class="ml-sm-auto">
        <RouterLink
          to=""
          class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
        >
          Forgot Password ?
        </RouterLink>
      </div>
    </div>
    <v-btn
      size="large"
      color="primary"
      :disabled="!valid"
      block
      variant="flat"
      @click="submit"
    >
      Sign In
    </v-btn>
  </v-form>
</template>
