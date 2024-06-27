import { useAuth, useGlobal, useUser } from '@/store';
import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router';

import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';

import axios from '@/utils/axios';

/** Router Rules */
const routes: RouteRecordRaw[] = [
  MainRoutes,
  AuthRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: async () => await import('@/views/ErrorView.vue'),
  },
];

/** Vue Router */
const router: Router = createRouter({
  /**
   * History Mode
   *
   * @see {@link https://router.vuejs.org/guide/essentials/history-mode.html }
   */
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory(import.meta.env.BASE_URL)
  /*
                  scrollBehavior: (to, _from, savedPosition) => {
                    let scrollTo: number | string = 0;

                    if (to.hash) {
                      scrollTo = to.hash;
                    } else if (savedPosition) {
                      scrollTo = savedPosition.top;
                    }
                    return goTo(scrollTo);
                  },
                  */
  routes,
});

// Global before guards
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards}
router.beforeEach(
  async (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const { setLoading, setMessage } = useGlobal();

    // Show Loading
    // comment out for https://github.com/logue/vite-vuetify-ts-starter/issues/16
    setLoading(true);

    // Get user information
    const authStore = useAuth();
    const userStore = useUser();

    if (authStore.accessToken && authStore.refreshToken) {
      // Making a POST request using axios
      const userInfo = await axios.get('/api/users/me');

      // User information check
      if (userInfo.data.data) {
        // User information settings
        try {
          await userStore.setUserInfo(userInfo.data.data);
        } catch (error) {
          // If user information cannot be retrieved, redirect to login
          next('/auth/404');
          return;
        }
      } else {
        const { setAccessToken, setRefreshToken } = authStore;

        setAccessToken(null);
        setRefreshToken(null);

        next('/auth/login');
        return;
      }
    } else {
      // Check page permissions
      const requiresAuth = _to.matched.some(record => record.meta.requiresAuth);

      if (requiresAuth) {
        next('/auth/login');
        return;
      }
    }

    // Hide snack bar
    setMessage('');
    next();
  }
);

// Global After Hooks
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-after-hooks}
router.afterEach(() => {
  const { setLoading } = useGlobal();
  // Hide Loading
  setLoading(false);
});

export default router;
