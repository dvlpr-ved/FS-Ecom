import { defineStore } from "pinia";

export const useRemoveWhishlist = defineStore('useRemoveWhishlist', {
    state: () => ({
        isLoading: false,
        error: null,
        message: null
    }),
    actions: {
        async fetchRemoveWishlist({ product_id }) {

            try {
                const body = {
                    product_id: product_id,
                    is_wishlist: 1,
                };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/deleteCart',
                    body,
                });

                if (!response.success) {
                    throw new Error('Error in Removing Item From Cart');
                }
                this.message = 'Error in Removing Item From Cart'
                return true;
            } catch (error) {
                console.error('Error in Removing Item From Cart:', error);
                this.error = 'Error in Removing Item From Cart';
                this.isLoading = false;
                return false;
            }
        }
    }
});
