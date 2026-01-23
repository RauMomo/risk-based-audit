import yaml from "@rollup/plugin-yaml";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/ui"],

  typescript: {
    strict: true,
    typeCheck: false, // Disable during dev for better performance, use 'npm run type-check' instead
  },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Risk-Based Internal Audit System",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Enterprise Risk Management and Internal Audit System",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  runtimeConfig: {
    // Private keys (only available server-side)
    apiSecret: "",

    // Public keys (exposed to client)
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3001/api",
    },
  },

  compatibilityDate: "2026-01-23",

  vite: {
    plugins: [yaml()],
  },

  future: {
    compatibilityVersion: 4,
  },
});
