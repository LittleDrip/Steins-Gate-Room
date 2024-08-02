import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        login() {
            this.isLoggedIn = true;
            // localStorage.setItem('isLoggedIn', 'true');
        },
        logout() {
            this.isLoggedIn = false;
            // sessionStorage.removeItem('isLoggedIn');
        },
        initialize() {
            const isLoggedIn = sessionStorage.getItem('isLoggedIn');
            this.isLoggedIn = isLoggedIn === 'true';
        },
    },
});