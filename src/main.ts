/**
 * Vue3 Main script
 */

// Load vue core
import store from '@/store';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

// eslint-disable-next-line import/no-named-as-default
import PerfectScrollbar from 'vue3-perfect-scrollbar';

import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
// eslint-disable-next-line import/order
import router from '@/rotuer';

import '@/scss/settings.scss';

// i18
import messages from '@/utils/locales/messages';

const i18n = createI18n({
  locale: 'en',
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

/** Register Vue */
const vue = createApp(App);
vue.use(router);
vue.use(store);
vue.use(vuetify);
vue.use(i18n);
vue.use(PerfectScrollbar);

// Run!
router
  .isReady()
  .then(() => vue.mount('#app'))
  .catch(e => console.error(e));
