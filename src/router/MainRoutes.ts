const MainRoutes = {
  path: '/',
  meta: {
    requiresAuth: false,
  },
  component: async () => await import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'Main',
      path: '/',
      component: async () => await import('@/views/index.vue'),
    },
    {
      name: 'About',
      path: '/about',
      component: async () => await import('@/views/AboutView.vue'),
    },
    {
      name: 'MyInfo',
      path: '/myinfo',
      component: async () => await import('@/views/MyInfo.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
};

export default MainRoutes;
