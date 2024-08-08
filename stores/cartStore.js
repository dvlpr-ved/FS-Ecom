import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => (
        { 
            cartItems: useState('cartItems', () => [])
        }),
    getters : {
        getCart(){
            return this.cartItems
        },
        getCartLength(){
            return this.cartItems.length
        },
    },
    actions : {
        async getCartItems(){
            try {
                const body = {
                    wishlist: 0
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
                this.cartItems = data;
                console.log(this.cartItems);
                return true
            }
            catch (error) {
            }
        },
        async saveCartItem(product_id){
            const req  = {product_id , is_wishlist : 0};
            const response = await fetchFromSanctum({
                method: 'POST',
                url: 'https://fashtsaly.com/API/public/api/addToCart',
                req,
            });    
            if(response.success){
                this.cartItems.push(response.data);
                return true
            }    
        }
    }
});