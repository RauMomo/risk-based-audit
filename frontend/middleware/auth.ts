export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore._initialized) {
    return;
  }
  if (!authStore.isAuthenticated) {
    return navigateTo("/auth/login");
  }
  return;
});
