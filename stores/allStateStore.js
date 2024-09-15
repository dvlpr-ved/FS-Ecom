import { defineStore } from "pinia";

export const useGetStateStore = defineStore('useGetStateStore', {
    state: () => ({
        stateList: []
    }),
    actions: {
        async fetchAllStates() {
            try {
                const res = await fetch("/data/states.json");
                const d = await res.json();
                this.stateList = d.states;
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        }
    }
});
