import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, setAuthHeader } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');
        if (token && email) {
            setAuthHeader(token);
            fetchCurrentUser(email);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchCurrentUser = async (email) => {
        try {
            const userData = await authAPI.getCurrentUser(email);
            setUser(userData);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const token = response.jwt;

            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', email);
            setAuthHeader(token);

            await fetchCurrentUser(email);
            return response;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed';
            throw new Error(errorMessage);
        }
    };

    const signup = async (email, password) => {
        try {
            await authAPI.register({ email, password });

            return await login(email, password);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed';
            throw new Error(errorMessage);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setAuthHeader(null);
        setUser(null);
    };

    const value = {
        user,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};