export function getPrice(price = 0 , price_subscribed = 0) {
    if(process.client){
        if(!price || price <= 0){
            return 0;
        }

        const authStore = useAuthStore();
        const user = authStore.getUser;   

        if(user){
            if(user.id){
                const is_subscribed = user.is_subscribed;
                const is_paid = user.is_paid;
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
export function getActualPrice(mrp = 0 , price = 0 , price_subscribed = 0) {
    console.log(mrp , price , price_subscribed);
    if(process.client){
        if(!price || price <= 0){
            return 0;
        }

        const authStore = useAuthStore();
        const user = authStore.getUser;

        if(user){
            if(user.id){
                const is_subscribed = user.is_subscribed;
                const is_paid = user.is_paid;
                if(!is_subscribed){
                    return mrp;
                }
                else if(is_subscribed && is_paid){
                    return price_subscribed - price;
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
  