const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true,
  },
  redirect: '/main',
  // component: () => import('@/layouts/full/FullLayout.vue'),
  children: [],
};

export default MainRoutes;
