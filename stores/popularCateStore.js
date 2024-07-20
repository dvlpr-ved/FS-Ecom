import { defineStore } from 'pinia';

export const usePopularCateStore = defineStore('usePopularCateStore', {
    state: () => ({
        cards: [],
        isLoading: true,
        error: null
    }),
    actions: {
        async fetchPopCataData(getCategory) {
            try {
                // const response = await fetch(`https://dummyjson.com/products/${getCategory}`);
                const response = await fetch(`https://dummyjson.com/products/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                this.cards = data.products;
                // console.log('Fetched cards:', this.cards);
                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching products:', error);
                this.error = 'Error Getting Data From Api';
                this.isLoading = false;
            }
        }
    }
});
