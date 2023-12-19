import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type { ConfigProps } from '@/config';

import config from '@/config';

/** User Store */
export default defineStore('customizer', () => {
  const sidebarDrawer: Ref<ConfigProps['Sidebar_drawer']> = ref(
    config.Sidebar_drawer
  );
  const customizerDrawer: Ref<ConfigProps['Customizer_drawer']> = ref(
    config.Customizer_drawer
  );
  const miniSidebar: Ref<ConfigProps['mini_sidebar']> = ref(
    config.mini_sidebar
  );
  const setHorizontalLayout: Ref<ConfigProps['setHorizontalLayout']> = ref(
    config.setHorizontalLayout
  );
  const actTheme: Ref<ConfigProps['actTheme']> = ref(config.actTheme);
  const setBorderCard: Ref<ConfigProps['setBorderCard']> = ref(
    config.setBorderCard
  );

  function setSidebarDrawer() {
    console.log(sidebarDrawer.value);
    // Disable scrolling when the menu opens
    document.documentElement.style.overflow = 'hidden';

    sidebarDrawer.value = !sidebarDrawer.value;
  }

  function setCustomizerDrawer(payload: any) {
    customizerDrawer.value = payload;
  }

  function setMiniSidebar(payload: any) {
    miniSidebar.value = payload;
  }

  function setLayout(payload: any) {
    setHorizontalLayout.value = payload;
  }

  function setTheme(payload: any) {
    actTheme.value = payload;
  }

  function setCardBorder(payload: any) {
    setBorderCard.value = payload;
  }

  return {
    sidebarDrawer,
    customizerDrawer,
    miniSidebar,
    setHorizontalLayout,
    actTheme,
    setBorderCard,
    setMiniSidebar,
    setSidebarDrawer,
  };
});
