import { defineStore } from 'pinia';
export const useHighCateStore = defineStore('useHighCateStore', {
    state: () => ({
        cards: [],
        isLoading: true,
        error: null
    }),
    actions: {
        async fetchHighCategoryData(getCategory) {
            try {
                const headers = {};
                const response = await fetchFromSanctum({
                    method: 'GET',
                    url: 'https://dummyjson.com/products/',
                    // url: 'https://fashtsaly.com/API/public/api/getCategories',
                });

                if (!response) {
                    throw new Error('Failed to fetch products');
                }
                // this.cards = response.data;
                this.cards = response.products;
                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching products:', error);
                this.error = 'Error Getting Data From Api';
                this.isLoading = false;
            }
        }
    }
});
