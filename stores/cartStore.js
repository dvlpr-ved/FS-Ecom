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
        getCartTotal(){
            return this.cartItems.reduce((sum, item) => sum + item.price ? item.price : 0, 0);
        }
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
                return true
            }
            catch (error) {
            }
        },
        async saveCartItem({product_id , quantity}){
            const itemExists = this.cartItems.some(item => item.product_id === product_id);
            if(itemExists){
                return {success : false , msg : 'item already exists'};
            }
            const response = await fetchFromSanctum({
                method: 'POST',
                url: 'https://fashtsaly.com/API/public/api/addToCart',
                body : {
                    'product_id' : product_id,
                    'is_wishlist' : 0,
                    'quantity' : quantity
                },
            });    
            if(response.success){
                this.cartItems.push(response.data);
                return response;
            }    
        }
    }
});