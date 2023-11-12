import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type ErrorMsgInterface from '@/interfaces/ErrorMsgInterface.ts';

/** Err Msg Store */
export default defineStore('errMsg', () => {
  const fieldList: Ref<ErrorMsgInterface> = ref({});

  const setErrorMessage = (fieldName: string, message: string): void => {
    fieldList.value[fieldName] = message;
  };

  const clearErrorMessage = (fieldName: string): void => {
    setErrorMessage(fieldName, '');
  };

  const getErrorMessages = (fieldName: string): [string] | [] => {
    const storedError: string | undefined = fieldList.value[fieldName];
    return storedError ? [storedError] : [];
  };

  return {
    fieldList,
    setErrorMessage,
    getErrorMessages,
    clearErrorMessage,
  };
});
