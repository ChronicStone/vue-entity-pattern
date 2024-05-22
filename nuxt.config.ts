// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@bg-dev/nuxt-naiveui',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  imports: {
    dirs: ['./store', './entity', './composables']
  }
})