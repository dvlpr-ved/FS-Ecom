export function getPrice(price = 0 , price_subscribed = 0) {
    if(process.client){
        if(!price || price <= 0){
            return 0;
        }

        const authStore = useAuthStore();
        const user = authStore.getUser;   

        if(user){
            if(user.id){
                const is_subscribed = user.is_subscribed_user;
                const is_paid = user.is_paid_subscription;
                if(!is_subscribed){
                    return price;
                }
                else if(is_subscribed && is_paid){
                    return price_subscribed;
                }
                else if(is_subscribed && !is_paid){
                    return price;
                }
                else{
                    return price;
                }
            }
        }
    }
}
export function getActualPrice(mrp_in = 0 , price_in = 0 , price_subscribed_in = 0) {
    const price_subscribed = parseInt(price_subscribed_in);
    const price = parseInt(price_in);
    const mrp = parseInt(mrp_in); 
    if(process.client){
        if(!price || price <= 0){
            return 0;
        }

        const authStore = useAuthStore();
        const user = authStore.getUser;

        if(user){
            if(user.id){
                const is_subscribed = user.is_subscribed_user;
                const is_paid = user.is_paid_subscription;
                if(!is_subscribed){
                    return mrp;
                }
                else if(is_subscribed && is_paid){
                    return price;
                }
                else if(is_subscribed && !is_paid){
                    return mrp;
                }
                else{
                    return mrp;
                }
            }
        }
    }      
}
export function getPercentSaving(mrp = 0 , price = 0 , price_subscribed = 0){
    if(process.client){
        if(!price || price <= 0){
            return 0;
        }

        const authStore = useAuthStore();
        const user = authStore.getUser;

        if(user){
            if(user.id){
                const price_actual = getPrice(price , price_subscribed);
                const price_fake = getActualPrice(mrp , price , price_subscribed);

                const savings = price_fake - price_actual;
                const savingsPercentage = (savings / price_fake) * 100;
                return savingsPercentage.toFixed(2); 
            }
        }
    }  
}
  