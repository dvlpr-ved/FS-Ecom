import { defineStore } from 'pinia'

export const useMetadataStore = defineStore('metadata', {
    state: () => ({
        metaData: {}
    }),

    actions: {
        async fetchMetaData() {
            const response = await fetch('https://fashtsaly.com/API/public/api/getMetaTags')
            const data = await response.json()
            data.forEach(item => {
                this.metaData[item.url] = {
                    title: item.page_title,
                    description: item.description,
                    meta_tags: item.meta_tags
                }
            })
        },

        getPageMeta(url) {
            switch (url) {
                case '/':
                case '/about':
                case '/contactus':
                case '/privacypolicy':
                    return this.metaData[url] || {}
                default:
                    return { title: 'Default Title', description: 'Default description', meta_tags: [] }
            }
        }
    }
})
