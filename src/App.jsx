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

function App() {
    /*
    const [joke, setJoke] = useState(null);

    useEffect(() => {
        async function fetchJoke() {
            try {
                const result = await axios.get('https://api.chucknorris.io/jokes/random');
                console.log(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchJoke();
    }, []);
     */

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/bibliotheek" element={<Bibliotheek />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;