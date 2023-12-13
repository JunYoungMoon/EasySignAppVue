import { useGlobal, useAuth, useUser } from '@/store';
import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router';

import MainRoutes from './MainRoutes';

// Components
import Default from '@/layouts/Default.vue';

// Pinia Store

// Unimplemented in Vuetify 3.3.1
// import { goTo } from 'vuetify/lib/services/goto/index.mjs';

/** Router Rules */
const routes: RouteRecordRaw[] = [
  MainRoutes,
  {
    path: '/myinfo',
    name: 'MyInfo',
    // route level code-splitting
    // this generates a separate chunk (MyInfo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: async () => await import('@/views/MyInfo.vue'),
    meta: {
      layout: Default,
      requiresAuth: true,
    },
  },
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
    const globalStore = useGlobal();
    // Set CsrfToken
    const authStore = useAuth();
    const userStore = useUser();
    await authStore.getCsrfToken();
    // Check Auth
    await authStore.checkAuth('accessToken', authStore.csrfToken);
    // Set User Info
    // Check if current route requires authentication
    const requiresAuth = _to.matched.some(record => record.meta.requiresAuth);

    // If the user is not authenticated and the current route requires authentication, redirect to login
    if (requiresAuth && !authStore.isAuth) {
      next('/login');
      return;
    }

    // User information settings
    if (authStore.isAuth) {
      try {
        await userStore.setUserInfo();
      } catch (error) {
        // If user information cannot be retrieved, redirect to login
        next('/login');
        return;
      }
    }

    // Show Loading
    // comment out for https://github.com/logue/vite-vuetify-ts-starter/issues/16
    // globalStore.setLoading(true);

    // Hide snack bar
    globalStore.setMessage('');
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
