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
    rulePass: (v: string) => {
      const isValid =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(
          v
        );
      return (
        isValid ||
        'The password must be a minimum of 8 characters and a maximum of 30 characters, and must include at least one number and a special character.'
      );
    },
    ruleNickname: (v: string) => {
      const isValid = /^[a-zA-Z가-힣]{2,10}$/.test(v);
      return (
        isValid ||
        'Nickname should be 2 to 10 characters long and consist of English letters or Korean characters.'
      );
    },
    ruleCode: (v: string) => {
      const isValid = /^[a-zA-Z0-9]{6}$/.test(v);
      return isValid || 'The authentication code format is incorrect.';
    },
  };
});
