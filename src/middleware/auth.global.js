import {fetchFromSanctum} from '../utils/sanctumApi.js'
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore =  useAuthStore();
    
    if(!authStore.isLoggedin && process.client){
        
        const data  =  await fetchFromSanctum({method : 'POST' , url : 'https://fashtsaly.com/API/public/api/refresh-token'});
        authStore.Login(data);
    }
});
