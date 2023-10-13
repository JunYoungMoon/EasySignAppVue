import { h } from 'vue';

import type { IconSet, IconProps } from 'vuetify';

import GoogleIcon from '@/components/icons/GoogleIcon.vue';

const customSvgNameToComponent: any = {
  GoogleIcon,
};

// Vuetify Custom icon set
// https://stackoverflow.com/questions/73795753/how-to-import-custom-svg-icons-in-vuetify-3
const customSVGs: IconSet = {
  component: (props: IconProps) =>
    h(customSvgNameToComponent[props.icon as string]),
};

export { customSVGs /* aliases */ };
