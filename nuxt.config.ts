// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/fonts'],
  css: [
    '~/assets/css/style.scss',
    '~/assets/css/theme/light.scss',
    '~/assets/css/theme/dark.scss'
  ],
  fonts: {
    defaults: {
      weights: [400, 600, 700],
      styles: ['normal'],
      subsets: ['latin']
    },
    families: [
      { name: 'DM Sans', provider: 'google' },
    ]
  },
  app: {
    baseURL: '/text-analyzer-vue'
  }
})