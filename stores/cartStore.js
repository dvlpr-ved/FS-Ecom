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
        getCartTotal() {
            return this.cartItems.reduce((sum, item) => {
              const finalPrice = getPrice(item.price, item.price_subscribed);
              console.log(finalPrice , price , price_subscribed);
              return sum + finalPrice * parseInt(item.quantity);
            }, 0);
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
                    url: 'https://fashtsaly.com/API/public/api/getCart?query=1',
                    body
                });
                if (!response) {
                    throw new Error('Error in Getting Item from Cart');
                }
                const data =  response;
                this.cartItems = data.data;
                return true
            }
            catch (error) {
            }
        },
        async saveCartItem({product_id , quantity}){
            const itemExists = this.cartItems.some(item => item.id === product_id);
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
        },
        async DeleteFromCart({product_id}){
            const response = await fetchFromSanctum({
                method: 'POST',
                url: 'https://fashtsaly.com/API/public/api/deleteCart',
                body : {
                    'product_id' : product_id,
                    'is_wishlist' : 0
                },
            });                
            if(response.success){
                this.cartItems = this.cartItems.filter(item => item.id != product_id);
                return true;
            }
        }
    }
});