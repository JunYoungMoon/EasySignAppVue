import { createI18n } from 'vue-i18n';

import messages from './messages';

const i18n = createI18n({
  locale: 'en',
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

export default i18n;
