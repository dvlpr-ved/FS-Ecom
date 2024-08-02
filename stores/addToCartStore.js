import { defineStore } from "pinia";

export const useAddToCartStore = defineStore('useAddToCartStore', {
    state: () => ({
        isLoading: false,
        error: null
    }),
    actions: {
        async fetchAddToCart({ product_id }) {
            this.isLoading = true;
            this.error = null;
            try {
                const body = {
                    product_id: product_id,
                    is_addedtocart: 0,
                    is_wishlist: 1,
                };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/addToCart',
                    body,
                });

                if (!response.ok) {
                    throw new Error('Error in Add To Cart');
                }

                console.log('response', await response.json());
                this.isLoading = false;
                return true;
            } catch (error) {
                console.error('Error Adding Product In Cart:', error);
                this.error = 'Error Adding Product In Cart';
                this.isLoading = false;
                return false;
            }
        }
    }
});
