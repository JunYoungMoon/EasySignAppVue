import { defineStore } from 'pinia';

/** Rule Store */
export default defineStore('rule', () => {
  return {
    ruleRequired: (v: any) => !!v || 'Required',
    ruleEmail: (value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Enter a valid email';
    },
    rulePassLen: (v: string) =>
      (!!v && v.length >= 6) || 'Password must be 6 chars or more',
    ruleNickname: (v: string) => {
      const isValid = /^[a-zA-Z가-힣]{2,10}$/.test(v);
      return (
        isValid ||
        'Nickname should be 2 to 10 characters long and consist of English letters or Korean characters.'
      );
    },
  };
});
