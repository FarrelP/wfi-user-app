export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "User Management App",
    }
  },
  modules: [
    ["@nuxtjs/tailwindcss", { viewer: false }],
    "@pinia/nuxt",
  ],
  routeRules: {
    '/': { redirect: '/users' },
  },
});
