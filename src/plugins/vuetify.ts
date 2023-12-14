/**
 * Vuetify3 Plugin
 */
import { createVuetify, type VuetifyOptions } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as labsComponents from 'vuetify/labs/components';
// Translations provided by Vuetify
import { en } from 'vuetify/locale';

// Misc
import { customSVGs } from '@/plugins/customSvgs';
// import { loadFonts } from '@/plugins/webfontloader';

import {
  DARK_BLUE_THEME,
  DARK_AQUA_THEME,
  DARK_ORANGE_THEME,
  DARK_PURPLE_THEME,
  DARK_GREEN_THEME,
  DARK_CYAN_THEME,
} from '@/theme/DarkTheme';
import {
  BLUE_THEME,
  AQUA_THEME,
  PURPLE_THEME,
  GREEN_THEME,
  CYAN_THEME,
  ORANGE_THEME,
} from '@/theme/LightTheme';

// Styles
// import 'vuetify/scss';
import '@mdi/font/css/materialdesignicons.css';

// await loadFonts();

/**
 * Vuetify Components
 * @see {@link https://vuetifyjs.com/en/features/treeshaking/}
 */
let vuetifyConfig: VuetifyOptions = {
  // Global configuration
  // https://vuetifyjs.com/en/features/global-configuration/
  /*
  defaults: {
    global: {
      ripple: false,
    },
    VSheet: {
      elevation: 4,
    },
  },
  */
  // Icon Fonts
  // https://vuetifyjs.com/en/features/icon-fonts/
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      custom: customSVGs,
    },
  },
  // Internationalization (i18n)
  // https://vuetifyjs.com/en/features/internationalization/#internationalization-i18n
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: { en },
  },
  // Theme
  // https://vuetifyjs.com/en/features/theme/
  theme: {
    defaultTheme: 'BLUE_THEME',
    themes: {
      BLUE_THEME,
      AQUA_THEME,
      PURPLE_THEME,
      GREEN_THEME,
      CYAN_THEME,
      ORANGE_THEME,
      DARK_BLUE_THEME,
      DARK_AQUA_THEME,
      DARK_ORANGE_THEME,
      DARK_PURPLE_THEME,
      DARK_GREEN_THEME,
      DARK_CYAN_THEME,
    },
  },
};

if (import.meta.env.DEV) {
  // Disable treeshaking for DEV mode.
  vuetifyConfig = {
    components: { components, labsComponents },
    directives,
    ...vuetifyConfig,
  };
}
export default createVuetify(vuetifyConfig);

// Export for test.
export { components, directives };
