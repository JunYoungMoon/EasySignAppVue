const AuthRoutes = {
  path: '/auth',
  meta: {
    requiresAuth: false,
  },
  // component: async () => await import('@/views/AboutView.vue'),
  children: [],
};

export default AuthRoutes;
