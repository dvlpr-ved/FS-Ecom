import { defineStore } from "pinia";

export const useGetAddress = defineStore('useGetAddress', {
    state: () => ({
        userAddress: [],
        isLoading: true,
        error: null
    }),
    actions: {
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
