import { defineStore } from "pinia";

export const useSearchByImageStore = defineStore('searchImages', {
    state: () => ({
        error: null,
        messages: null,
    }),
    actions: {
        async fetchSearchByImage(body) {
            try {
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/fetchSearchResultByImage',
                    body:body
                });
                if (!response) {
                    this.error = 'Error in fetching images';
                    throw new Error('Network response was not ok');
                }
                // const data = await response.json();
                if(response.success){
                    return response.data
                }
                else{
                    return false;
                }
            } catch (error) {
                console.error('Error fetching images:', error);
                this.error = 'Error fetching images';
                return false;
            }
        },
    }
});
