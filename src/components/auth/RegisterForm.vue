<script setup lang="ts">
import { useRule } from '@/store';
import { ref } from 'vue';

const { ruleRequired, ruleNickname, rulePassLen, ruleEmail } = useRule();

const valid = ref(false);
const password = ref('');
const email = ref('');
const name = ref('');
</script>
<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    action="/pages/boxedlogin"
    class="mt-5"
  >
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

    <v-label class="text-subtitle-1 font-weight-medium pb-2">
      Email Address
    </v-label>
    <VTextField v-model="email" :rules="[ruleRequired, ruleEmail]" />

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
      submit
      variant="flat"
      :disabled="!valid"
    >
      Sign Up
    </v-btn>
  </v-form>
</template>
