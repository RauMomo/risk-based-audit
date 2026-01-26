export default defineNuxtPlugin(async () => {
  return {
    provide: {
      authStore: useAuthStore(),
    },
  };
});

//   const authStore = useAuthStore();

//   // Fetch user on app init (e.g., from API or localStorage)
//   await authStore.fetchUser();

//   // Mark as initialized to avoid redundant fetches
//   authStore.$patch({ _initialized: true });
// },
