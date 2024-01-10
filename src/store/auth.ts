import {defineStore} from 'pinia';
import router from '@/router';
import {fetchWrapper} from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(phone: string, birth: string) {
            // const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {phone, birth});

            const user = {
              phone,
              birth,
            }

            // update pinia state
            this.user = user;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            // redirect to previous url or default to home page
            await router.push('/goods');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            void router.push('/auth/login');
        }
    }
});
