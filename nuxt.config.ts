import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  modules: [
    '@nuxtjs/leaflet'
  ],

  css: [
    'leaflet/dist/leaflet.css'
  ],

  build: {
    transpile: [
      'vuetify'
    ]
  },

  vite: {
    plugins: [
      vuetify({
        autoImport: true
      })
    ],

    vue: {
      template: {
        transformAssetUrls
      }
    },

    optimizeDeps: {
      include: [
        'qr-scanner',
        'leaflet'
      ]
    },

    assetsInclude: [
      '**/*.worker.js'
    ]
  },

  runtimeConfig: {
    public: {
      // @ts-ignore
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID
    }
  }
})