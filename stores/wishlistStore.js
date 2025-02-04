import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlistStore', {
    state: () => ({
        wishlistItems: []
    }),
    getters: {
        getWishlist() {
            return this.wishlistItems;
        },
        getWishlistLength() {
            return this.wishlistItems.length;
        },
        getWishlistTotal() {
            return this.wishlistItems.reduce((sum, item) => sum + (item.price || 0), 0);
        },
        getWishlisterIds(){
            var ids = [];
            this.wishlistItems.forEach(item => {
                ids.push(item.id);
            });
            return ids;
        }
    },
    actions: {
        async fetchWishlistItems() {
            try {
                const body = { wishlist: 1 };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/getCart?query=2',
                    body
                });
                if (!response || !response.data) {
                    throw new Error('Error fetching wishlist items');
                }
                this.wishlistItems = response.data;
                return true;
            } catch (error) {
                console.error('Error fetching wishlist items:', error);
                return false;
            }
        },
        async saveWishlistItems(product_id) {
            const itemExists = this.wishlistItems.some(item => item.id === product_id);
            if (itemExists) {
                return await this.fetchRemoveWishlist(product_id);
            }
            try {
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/addToCart',
                    body: { product_id, is_wishlist: 1 }
                });
                if (response.success) {
                    this.wishlistItems.push(response.data);
                    return response;
                }
            } catch (error) {
                console.error('Error saving item to wishlist:', error);
            }
            return { success: false, msg: 'Failed to add item to wishlist' };
        },
        async fetchRemoveWishlist(product_id) {
            try {
                const body = { product_id, is_wishlist: 1 };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/deleteCart',
                    body
                });
                if (response.success) {
                    this.wishlistItems = this.wishlistItems.filter(item => item.id !== product_id);
                    return true;
                } else {
                    throw new Error('Error removing item from wishlist');
                }
            } catch (error) {
                console.error('Error removing item from wishlist:', error);
                return false;
            }
        }
    }
});
