import './App.css';
import { Routes, Route } from "react-router-dom";
import Blank from './pages/Unused/Blank.jsx';
import Home from './pages/winkel/Home.jsx';
import Account from './pages/account/Account.jsx';
import Bibliotheek from './pages/bibliotheek/Bibliotheek.jsx';
import Navigation from './components/navigation/./Navigation.jsx';
import NotFound from "./pages/NotFound/NotFound.jsx";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameDetails from "./pages/GameDetails/GameDetails.jsx";
import SignIn from "./pages/account/SignIn.jsx";
import SignUp from "./pages/account/SignUp.jsx";
import ChangePassword from "./pages/account/ChangePassword.jsx";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Search from "./pages/search/Search.jsx";
import Wishlist from './pages/Wishlist/Wishlist.jsx';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart.jsx';

function App() {
    return (
        <AuthProvider>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <Account />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bibliotheek"
                    element={
                        <ProtectedRoute>
                            <Bibliotheek />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shoppingcart"
                    element={
                        <ProtectedRoute>
                            <ShoppingCart />
                        </ProtectedRoute>
                    }
                />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="*" element={<NotFound />} />
                <Route path="search" element={<Search />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;