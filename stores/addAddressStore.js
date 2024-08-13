import { defineStore } from "pinia";

export const useAddAddress = defineStore('useAddAddress', {
    state: () => ({
        error: null,
        successMessage: null
    }),
    actions: {
        async fetchAddAddress({ name, email, phone, pincode, locality, address, city, states, landmark }) {
            try {
                const body = {
                    name, email, phone, pincode, locality, address, city, state : states, landmark
                };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/saveUserAddress',
                    body,
                });
                if (!response.success) {
                    this.error = 'Error Adding Address'
                    throw new Error('Error Adding Address');
                }
                this.successMessage = 'Address Added';
                return true;
            } catch (error) {
                console.error('Error Adding Address:', error);
                this.error = 'Error Adding Address';
                return false;
            }
        },
        async fetchUpdateAddAddress({entry_id, name, email, phone, pincode, locality, address, city, states, landmark }) {
            try {
                const body = {
                    entry_id , name, email, phone, pincode, locality, address, city, state : states, landmark
                };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/saveUserAddress',
                    body,
                });
                if (!response.success) {
                    this.error = 'Error Updating Address'
                    throw new Error('Error Updating Address');
                }
                this.successMessage = 'Address Added';
                return true;
            } catch (error) {
                console.error('Error Updating Address:', error);
                this.error = 'Error Updating Address';
                return false;
            }
        }        
    }
});