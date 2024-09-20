import { defineStore } from "pinia";

export const useProfileStore = defineStore('useProfileStore', {
    state: () => ({
        error: null,
        successMessage: null,
    }),
    actions: {
        async fetchEditProfile({ name, gender, phone, image = null, image_name = null }) {
            try {
                const body = {
                    name, gender, phone, image, image_name
                };
                const response = await fetchFromSanctum({
                    method: 'POST',
                    url: 'https://fashtsaly.com/API/public/api/updateUserProfile',
                    body,
                });
                if (!response) {
                    this.error = 'Error Updating Profile'
                    throw new Error('Error Updating Profile');
                }
                this.successMessage = 'Profile Updated';
                return true;
            } catch (error) {
                console.error('Error Updating Profile:', error);
                this.error = 'Error Updating Profile';
                return false;
            }
        },
    }
});
