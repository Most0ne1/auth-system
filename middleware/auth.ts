export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.user && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login');
  }
});
