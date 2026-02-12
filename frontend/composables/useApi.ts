export const useApi = () => {
  const config = useRuntimeConfig();

  const apiFetch = $fetch.create({
    baseURL: config.public.apiBase as string,
    onRequest({ options }) {
      // Add headers if needed (e.g., auth token)
      // options.headers = {
      //   ...options.headers,
      //   Authorization: `Bearer ${token}`,
      // };
    },
  });

  return {
    apiFetch,
  };
};
