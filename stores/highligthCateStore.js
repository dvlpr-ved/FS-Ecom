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
                const response = await fetch(`https://dummyjson.com/products/${getCategory}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                this.cards = data.products;
                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching products:', error);
                this.error = 'Error Getting Data From Api';
                this.isLoading = false;
            }
        }
    }
});
