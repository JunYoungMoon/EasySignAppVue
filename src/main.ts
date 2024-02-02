/**
 * Vue3 Main script
 */

// Load vue core
import store, { useCsrf } from '@/store';
import { createApp } from 'vue';

// eslint-disable-next-line import/no-named-as-default
import PerfectScrollbar from 'vue3-perfect-scrollbar';

import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import i18n from '@/utils/locales/i18n';

import '@/scss/settings.scss';

/** Register Vue */
const vue = createApp(App);
vue.use(store);
vue.use(router);
vue.use(vuetify);
vue.use(i18n);
vue.use(PerfectScrollbar);

// csrf token initial settings
const csrfStore = useCsrf();
void csrfStore.getCsrfToken();

// Run!
router
  .isReady()
  .then(() => vue.mount('#app'))
  .catch(e => console.error(e));
