// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Entity repo | Demo',
      script: [{ src: 'https://code.iconify.design/1/1.0.0/iconify.min.js' }],
    },
  },
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  modules: ['@bg-dev/nuxt-naiveui', '@pinia/nuxt', '@unocss/nuxt', 'nuxt-icon', '@vue-macros/nuxt'],
  imports: {
    dirs: ['./store', './composables', 'entities/**/*', './utils/**/*', './config'],
  },
  components: {
    dirs: [{ path: 'components', pathPrefix: false }],
  },
  experimental: {
    typedPages: true,
  },
  css: ['@/assets/styles/styles.scss', '@unocss/reset/tailwind.css'],
});
