const AuthRoutes = {
  path: '/auth',
  meta: {
    requiresAuth: false,
  },
    component: () => import('@/layouts/blank/BlankLayout.vue'),
  children: [
    {
      name: 'Boxed Login',
      path: '/auth/login',
            component: () => import('@/views/authentication/BoxedLogin.vue')
    },
  ],
};

export default AuthRoutes;
