<script setup lang="ts">
import { ref } from 'vue';

import { Form } from 'vee-validate';

/* Social icons */
import facebook from '@/assets/images/svgs/facebook-icon.svg';
import google from '@/assets/images/svgs/google-icon.svg';
import { useAuthStore } from '@/store/auth';

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref('admin123');
const username = ref('info@wrappixel.com');
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) =>
    (v && v.length <= 10) || 'Password must be less than 10 characters',
]);
const emailRules = ref([
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]);

async function validate(values: any, { setErrors }: any) {
  const authStore = useAuthStore();
  return await authStore
    .login(username.value, password.value)
    .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
  <Form v-slot="{ errors, isSubmitting }" class="mt-5" @submit="validate">
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Username
    </v-label>
    <VTextField
      v-model="username"
      :rules="emailRules"
      class="mb-8"
      required
      hide-details="auto"
    />
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Password
    </v-label>
    <VTextField
      v-model="password"
      :rules="passwordRules"
      required
      hide-details="auto"
      type="password"
      class="pwdInput"
    />
    <div class="d-flex flex-wrap align-center my-3 ml-n2">
      <v-checkbox
        v-model="checkbox"
        :rules="[(v: any) => !!v || 'You must agree to continue!']"
        required
        hide-details
        color="primary"
      >
        <template #label class="">Remeber this Device</template>
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
      :loading="isSubmitting"
      color="primary"
      :disabled="valid"
      block
      type="submit"
      variant="flat"
    >
      Sign In
    </v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
</template>