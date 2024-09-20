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
                case '/legalpolicy':
                case '/shippingpolicy':
                case '/myorder':
                case '/payment':
                case '/cancellation':
                case '/faq':
                case '/sitemap':
                case '/subscriptionplans':
                case '/seller':
                case '/searchResult':
                case '/mycart':
                case '/wishlist':
                case '/myaccounts':
                    return this.metaData[url] || {}
                default:
                    return {
                        title: 'Online Shopping Site for Reselling Products',
                        description: 'Online Shopping Site for Reselling Products',
                        meta_tags: ['Online Shopping in India, online Shopping store, Online Shopping Site, Buy Online, Shop Online, Online']
                    }
            }
        }
    }
})
