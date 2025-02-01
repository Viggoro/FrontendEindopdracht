import React from 'react';
import './Navigation.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";
import driehoek from "../../assets/Driehoek.svg";
import PageIcon from "../header/MyLogo.jsx";
import { useAuth } from '../../context/AuthContext';

function Navigation() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const signUp = () => {
        navigate('/signup');
    };

    const signIn = () => {
        navigate('/signin');
    };

    const home = () => {
        navigate('/');
    };

    return (
        <nav>
            <NavLink to={"/"}>
                <PageIcon icon={logo} title="Logos"/>
            </NavLink>
            <div className={`nav-container ${user ? 'nav-container-logged-in' : ''}`}>
                <ul>
                    <li>
                        <NavLink to="/" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                            Winkel
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bibliotheek"
                                 className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                            Bibliotheek
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                            Account
                        </NavLink>
                    </li>
                </ul>
            </div>
            {user && (
                <>
                    <button className="signinup triangle-button" onClick={home}>
                        <img src={driehoek} alt="Triangle Icon"/>
                    </button>
                    <button className="signinup triangle-button" onClick={home}>
                        <img src={driehoek} alt="Triangle Icon"/>
                    </button>
                </>
            )}
            <button className="signinup" onClick={signUp}>sign-up</button>
            <button className="signinup" onClick={signIn}>sign-in</button>
        </nav>
    );
}

export default Navigation;