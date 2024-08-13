import { defineNuxtConfig } from 'nuxt/config';
export default defineNuxtConfig({
  target: 'static',
  app: {
    head: {
      meta: [
        { 'http-equiv': 'x-ua-compatible', 'content': 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: 'https://fashtsaly.com/API/public/',
    },
  },
  build: {
    transpile: [
      'chart.js',
      'primevue'
    ]
  },

  components: {
    dirs: [
      {
        extensions: ['vue'],
        global: true,
        path: '~/components/',
        pathPrefix: false
      }
    ]
  },
  middleware: ['auth'],

  css: [
    'primevue/resources/primevue.css',
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
    'prismjs/themes/prism-coy.css',
    '~/assets/styles/layout.scss',
    '~/assets/demo/flags/flags.css'
  ],

  dir: {
    public: '../public/'
  },

  experimental: {
    asyncContext: true,
    headNext: true,
    typedPages: true,
    typescriptBundlerResolution: true
  },

  // @ts-ignore
  googleFonts: {
    families: {
      Inter: true
    }
  },

  imports: {
    autoImport: true,
    addons: {
      vueTemplate: true
    }
  },
  plugins: [
    '~/plugins/vue-product-zoomer.js'
  ],
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/google-fonts',
    '~/modules/primevue',
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt',
  ],
  nitro: {
    experimental: {
      asyncContext: true
    },

    future: {
      nativeSWR: true
    }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },

  srcDir: 'src/',

  typescript: {
    shim: false
  },

  vite: {
    build: {
      sourcemap: false
    },
    clearScreen: true,
    logLevel: 'info'
  },

  pwa: {
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
});
