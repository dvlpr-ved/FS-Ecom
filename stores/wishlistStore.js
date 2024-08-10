import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('useWishlistStore', {
    state: () => (
        {
            wishlistItems: useState('wishlistItems', () => [])
        }),
    getters: {
        getWishlist() {
            return this.wishlistItems
        },
        getWishlistLength() {
            return this.wishlistItems.length
        },
        getWishlistTotal() {
            return this.wishlistItems.reduce((sum, item) => sum + item.price ? item.price : 0, 0);
        }
    },
    actions: {
        async fetchWishlistItems() {
            try {
                const body = {
                    wishlist: 1
                };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/getCart',
                    body
                });
                if (!response) {
                    throw new Error('Error in Getting Item from Cart');
                }
                const data = await response.data;
                this.wishlistItems = data;
                return true
            }
            catch (error) {
            }
        },
        async saveWishlistItems({ product_id }) {
            const itemExists = this.wishlistItems.some(item => item.product_id === product_id);
            if (itemExists) {
                return { success: false, msg: 'item already exists' };
            }
            const response = await fetchFromSanctum({
                method: 'POST',
                url: 'https://fashtsaly.com/API/public/api/addToCart',
                body: {
                    'product_id': product_id,
                    'is_wishlist': 1,
                },
            });
            if (response.success) {
                this.wishlistItems.push(response.data);
                return response;
            }
        },
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
                else{
                    this.wishlistItems = this.wishlistItems.filter(item => item.id != product_id);
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
