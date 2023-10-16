import { h } from 'vue';

import type { IconSet, IconProps } from 'vuetify';

import GoogleIcon from '@/components/icons/GoogleIcon.vue';
import KakaoIcon from '@/components/icons/KakaoIcon.vue';
import NaverIcon from '@/components/icons/NaverIcon.vue';

const customSvgNameToComponent: any = {
  GoogleIcon,
  KakaoIcon,
  NaverIcon,
};

// Vuetify Custom icon set
// https://stackoverflow.com/questions/73795753/how-to-import-custom-svg-icons-in-vuetify-3
const customSVGs: IconSet = {
  component: (props: IconProps) =>
    h(customSvgNameToComponent[props.icon as string]),
};

export { customSVGs /* aliases */ };
