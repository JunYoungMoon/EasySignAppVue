/**
 * Vue3 Main script
 */

// Load vue core
import store from '@/store';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';

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

// Run!
router
  .isReady()
  .then(() => vue.mount('#app'))
  .catch(e => console.error(e));
