import { defineNuxtPlugin } from '#app'
import VueProductZoomer from 'vue-product-zoomer'


export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
      const VueProductZoomer = require('vue-product-zoomer').default
      nuxtApp.vueApp.use(VueProductZoomer)
    }
  })