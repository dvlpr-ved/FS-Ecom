import { defineStore } from "pinia";

export const useAddressStore = defineStore('useAddressStore', {
    state: () => ({
        error: null,
        successMessage: null,
        userAddress: [],
        isLoading: true,
        error: null
    }),
    actions: {
        async fetchAddAddress({ name, email, phone, pincode, locality, address, city, states, landmark }) {
            try {
                const body = {
                    name, email, phone, pincode, locality, address, city, state: states, landmark
                };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/saveUserAddress',
                    body,
                });
                if (!response.success) {
                    this.error = 'Error Adding Address';
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

        async fetchEditAddress({ id, name, email, phone, pincode, locality, address, city, states, landmark }) {
            try {
                const body = {
                    id, name, email, phone, pincode, locality, address, city, state: states, landmark
                };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: `https://fashtsaly.com/API/public/api/updateUserAddress/${id}`,
                    body,
                });
                if (!response.success) {
                    this.error = 'Error Updating Address';
                    throw new Error('Error Updating Address');
                }
                this.successMessage = 'Address Updated';
                return true;
            } catch (error) {
                console.error('Error Updating Address:', error);
                this.error = 'Error Updating Address';
                return false;
            }
        },
        async fetchUserAddress() {
            this.isLoading = true;
            try {
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/getUserAddress',
                });
                if (!response) {
                    throw new Error('Error in Getting Address From Cart');
                }
                const data = await response.data;
                this.userAddress = data;
                this.isLoading = false;
            }
            catch (error) {
                console.error('Error in Getting Address From Cart:', error);
                this.error = 'Error in Getting Address From Cart';
                this.isLoading = false;
            }
        }
    }
});
