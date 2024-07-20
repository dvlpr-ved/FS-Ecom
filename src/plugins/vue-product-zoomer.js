import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const VueProductZoomer = (await import('vue-product-zoomer')).default
    nuxtApp.vueApp.use(VueProductZoomer)
  }
})