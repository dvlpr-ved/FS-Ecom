// import { defineStore } from "pinia";

// export const useGetWhsilistItems = defineStore('useGetWhsilistItems', {
//     state: () => ({
//         items: [],
//         isLoading: true,
//         error: null
//     }),
//     actions: {
//         async fetchGetItemFromCart() {
//             this.isLoading = true;
//             try {
//                 const body = {
//                     wishlist: 1
//                 };
//                 const response = await fetchFromSanctum({
//                     method: 'POST',
//                     url: 'https://fashtsaly.com/API/public/api/getCart',
//                     body
//                 });
//                 if (!response) {
//                     throw new Error('Error in Getting Item from Cart');
//                 }
//                 const data = await response.data;
//                 this.items = data;
//                 this.isLoading = false;
//             }
//             catch (error) {
//                 console.error('Error in Getting Product From Cart:', error);
//                 this.error = 'Error Getting Product From Cart';
//                 this.isLoading = false;
//             }
//         }
//     }
// });
