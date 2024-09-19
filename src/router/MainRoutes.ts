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
      component: async () => await import('@/views/Main.vue'),
    },
    {
      name: 'Modern',
      path: '/modern',
      component: async () => await import('@/views/Main.vue'),
    },
    {
      name: 'About',
      path: '/about',
      component: async () => await import('@/views/AboutView.vue'),
    },
    {
      name: 'My Profile',
      path: '/myProfile',
      component: async () => await import('@/views/MyProfile.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
};

export default MainRoutes;
