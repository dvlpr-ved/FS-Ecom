import { defineStore } from "pinia";
export const useAddToCartStore = defineStore('useAddToCartStore', {
    state: () => ({
        cards: [],
        isLoading: true,
        error: null
    }),
    actions: {
        async fetchAddToCart({ product_id }) {
            try {
                const body = {
                    product_id: product_id,
                    is_addedtocart: 0,
                    is_wishlist: 1
                };
                const response = fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/addToCart',
                    body,
                })
                if (!response) {
                    throw new Error('Error in Add To Cart')
                }
                console.log('response', response);
                console.log(product_id);
                // this.cards = response;
                // this.cards = response.products;
                this.isLoading = false;
            }
            catch (error) {
                console.error('Error Adding Product In Cart:', error);
                this.error = 'Error Adding Product In Cart';
                this.isLoading = false;
            }
        }
    }
})