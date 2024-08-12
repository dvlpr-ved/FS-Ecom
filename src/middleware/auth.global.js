import {fetchFromSanctum} from '../utils/sanctumApi.js'
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore =  useAuthStore();
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    if(!authStore.isLoggedin && process.client){     
        const data  =  await fetchFromSanctum({method : 'POST' , url : 'https://fashtsaly.com/API/public/api/refresh-token'});
        authStore.Login(data);
    }
    if(authStore.isLoggedin){
        console.log(cartStore.getCart , wishlistStore.getWishlist);
        if(!cartStore.getCart.length){
            await cartStore.getCartItems();
        }
        if(!wishlistStore.getWishlist.length){
            await wishlistStore.fetchWishlistItems();
        }
    }
});
