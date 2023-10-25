import { createPinia, type Pinia } from 'pinia';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Pinia Stores
import useAuth from '@/store/AuthStore';
import useConfig from '@/store/ConfigStore';
import useGlobal from '@/store/GlobalStore';
import useUser from '@/store/UserStore';

/** Pinia Store */
const pinia: Pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

export { useConfig, useGlobal, useAuth, useUser };
