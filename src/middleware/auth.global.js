import { fetchFromSanctum } from '../utils/sanctumApi.js'
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();

    if (!authStore.isUserLoggedin && process.client) {
        const data = await fetchFromSanctum({ method: 'POST', url: 'https://fashtsaly.com/API/public/api/refresh-token' });
        if (data.res) {
            authStore.Login(data);
        }
    }
    if (authStore.isUserLoggedin) {
        if (!cartStore.getCart.length) {
            await cartStore.getCartItems();
        }
        if (!wishlistStore.getWishlist.length) {
            await wishlistStore.fetchWishlistItems();
        }
    }
});
