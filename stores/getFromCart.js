import { defineStore } from "pinia";
export const useGetItemFromCart = defineStore('useGetItemFromCart', {
    state: () => ({
        items: [],
        isLoading: true,
        error: null
    }),
    actions: {
        async fetchGetItemFromCart() {
            try {
                // const body = {};
                const response = fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/getCart',
                    // body,
                })
                if (!response) {
                    throw new Error('Error in Getting Item from Cart')
                }
                this.items = response.data;
                console.log('cart ITems',response);
                this.isLoading = false
            }
            catch (error) {
                console.error('Error in Getting Product From Cart:', error);
                this.error = 'Error Getting Product From Cart';
                this.isLoading = false
            }
        }
    }
})