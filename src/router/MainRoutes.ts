const MainRoutes = {
  path: '/',
  meta: {
    requiresAuth: false,
  },
  component: async () => await import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      path: '/',
      component: async () => await import('@/views/index.vue'),
    },
    {
      path: '/about',
      component: async () => await import('@/views/AboutView.vue'),
    },
  ],
};

export default MainRoutes;
