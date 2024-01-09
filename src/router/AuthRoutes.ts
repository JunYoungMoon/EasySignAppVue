const AuthRoutes = {
  path: '/auth',
  meta: {
    requiresAuth: false,
  },
  component: async () => await import('@/layouts/blank/BlankLayout.vue'),
  children: [
    {
      name: 'Login',
      path: '/auth/login',
      component: async () =>
        await import('@/views/authentication/BoxedLogin.vue'),
    },
    {
      name: 'Register',
      path: '/auth/register',
      component: async () =>
        await import('@/views/authentication/BoxedRegister.vue'),
    },
    {
      name: 'Forgot Password',
      path: '/auth/forgot-password',
      component: async () =>
        await import('@/views/authentication/BoxedForgotPassword.vue'),
    },
    {
      name: 'Error',
      path: '/auth/404',
      component: async () => await import('@/views/authentication/Error.vue'),
    },
    {
      name: 'Maintenance',
      path: '/auth/maintenance',
      component: async () =>
        await import('@/views/authentication/Maintenance.vue'),
    },
  ],
};

export default AuthRoutes;
