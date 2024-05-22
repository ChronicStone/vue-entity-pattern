// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@bg-dev/nuxt-naiveui', '@pinia/nuxt', '@nuxt/eslint', '@unocss/nuxt'],
  imports: {
    dirs: ['./store', './composables', 'entities/**/*'],
  },
  components: {
    dirs: [{ path: 'components', pathPrefix: false }],
  },
  experimental: {
    typedPages: true,
  },
});
