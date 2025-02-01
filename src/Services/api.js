import axios from 'axios';

const API_BASE_URL = 'https://api.datavortex.nl/gamecatalogviggo';
const API_KEY = 'gamecatalogviggo:6e30glBIDWuBV7bjCciu';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY
    }
});

export const authAPI = {
    register: async (userData) => {
        const response = await api.post('/users', {
            username: userData.email,
            email: userData.email,
            password: userData.password,
            info: "User registration",
            authorities: [
                {
                    authority: "USER"
                }
            ]
        });
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/users/authenticate', {
            username: credentials.email,
            password: credentials.password
        });
        console.log(response);
        return response.data;
    },

    getCurrentUser: async (email) => {
        const token = localStorage.getItem('token');
        const response = await api.get(`/users/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
};

// Add auth token to all future requests
export const setAuthHeader = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;