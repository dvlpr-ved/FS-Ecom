import { defineStore } from "pinia";

export const useUnreadMsg = defineStore('unreadmsg', {
    state: () => ({
        error: null,
        messages: null,
    }),
    actions: {
        async fetchUnreadMsg() {
            try {
                const response = await fetchFromSanctum({
                    method: 'GET',
                    url: 'https://fashtsaly.com/API/public/api/getUnreadUsercount',
                });
                if (!response) {
                    this.error = 'Error Getting unread messages';
                    throw new Error('Error Getting unread messages');
                }
                // const data = await response.json()
                this.messages = response;
                return true;
            } catch (error) {
                console.error('Error Getting unread messages:', error);
                this.error = 'Error Getting unread messages';
                return false;
            }
        },
    }
});