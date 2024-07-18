import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({ isLoggedin: false, isSignedUp : false , userData : {} }),
    getters : {
        getUser(){
            return this.userData
        }
    },
    actions : {
        verifyEmail(){
            
        },
        signUp(){

        },
        Login(){
            
        }
    }
});