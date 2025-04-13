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

const handleUserDataOperation = async (operation) => {
    try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');
        
        if (!token || !email) {
            throw new Error('User not authenticated');
        }

        const userData = await authAPI.getCurrentUser(email);
        

        let userInfo;
        try {
            userInfo = userData.info && userData.info.trim() !== '' 
                ? JSON.parse(userData.info) 
                : { wishlist: [], library: [], cart: [] };
        } catch (error) {
            console.log('Error parsing user info, initializing with empty data');
            userInfo = { wishlist: [], library: [], cart: [] };
        }

        if (!userInfo.wishlist) userInfo.wishlist = [];
        if (!userInfo.library) userInfo.library = [];
        if (!userInfo.cart) userInfo.cart = [];

        await operation(userInfo);

        const updatedInfo = JSON.stringify(userInfo);

        const response = await api.put(`/users/${email}`, {
            info: updatedInfo
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error in user data operation:', error);
        throw error;
    }
};

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
    },
    
    changePassword: async (newPassword) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');
        
        if (!token || !email) {
            throw new Error('User not authenticated');
        }
        
        const response = await api.put(`/users/${email}`, {
            password: newPassword
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    }
};

export const userAPI = {
    getUserData: async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('userEmail');
            
            if (!token || !email) {
                return { wishlist: [], library: [], cart: [] };
            }

            const userData = await authAPI.getCurrentUser(email);

            try {
                if (!userData.info || userData.info.trim() === '') {
                    return { wishlist: [], library: [], cart: [] };
                }
                
                const userInfo = JSON.parse(userData.info);
                return {
                    wishlist: userInfo.wishlist || [],
                    library: userInfo.library || [],
                    cart: userInfo.cart || []
                };
            } catch (error) {
                console.error('Error parsing user info:', error);
                return { wishlist: [], library: [], cart: [] };
            }
        } catch (error) {
            console.error('Error getting user data:', error);
            return { wishlist: [], library: [], cart: [] };
        }
    },

    toggleWishlist: async (gameId) => {
        return handleUserDataOperation(async (userInfo) => {
            if (!userInfo.library.includes(gameId)) {
                const wishlistIndex = userInfo.wishlist.indexOf(gameId);
                if (wishlistIndex === -1) {
                    userInfo.wishlist.push(gameId);
                } else {
                    userInfo.wishlist.splice(wishlistIndex, 1);
                }
            }
        });
    },
    
    getUserWishlist: async () => {
        try {
            const userData = await userAPI.getUserData();
            return userData.wishlist;
        } catch (error) {
            console.error('Error getting wishlist:', error);
            return [];
        }
    },

    addToCart: async (gameId) => {
        return handleUserDataOperation(async (userInfo) => {
            if (!userInfo.cart.includes(gameId) && !userInfo.library.includes(gameId)) {
                userInfo.cart.push(gameId);

                const wishlistIndex = userInfo.wishlist.indexOf(gameId);
                if (wishlistIndex !== -1) {
                    userInfo.wishlist.splice(wishlistIndex, 1);
                }
            }
        });
    },

    removeFromCart: async (gameId) => {
        return handleUserDataOperation(async (userInfo) => {
            const cartIndex = userInfo.cart.indexOf(gameId);
            if (cartIndex !== -1) {
                userInfo.cart.splice(cartIndex, 1);
            }
        });
    },

    getUserCart: async () => {
        try {
            const userData = await userAPI.getUserData();
            return userData.cart;
        } catch (error) {
            console.error('Error getting cart:', error);
            return [];
        }
    },

    getUserLibrary: async () => {
        try {
            const userData = await userAPI.getUserData();
            return userData.library;
        } catch (error) {
            console.error('Error getting library:', error);
            return [];
        }
    },

    checkout: async () => {
        return handleUserDataOperation(async (userInfo) => {
            userInfo.cart.forEach(gameId => {
                if (!userInfo.library.includes(gameId)) {
                    userInfo.library.push(gameId);
                }
            });

            userInfo.cart = [];
        });
    }
};

export const setAuthHeader = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;