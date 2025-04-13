import React from 'react';
import './Navigation.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";
import carticon from "../../assets/Shoppingcart.svg";
import heartemoji from "../../assets/Heartemoji.svg";
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

    const wishlist = () => {
        navigate('/wishlist');
    };

    const shoppingcart = () => {
        navigate('/shoppingcart');
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
                    <button className="wishshoppinglist wishlist-button" onClick={wishlist}>
                        <img src={heartemoji} alt="Heart Emoji"/>
                    </button>
                    <button className="wishshoppinglist shoppingcart-button" onClick={shoppingcart}>
                        <img src={carticon} alt="Cart Icon"/>
                    </button>
                </>
            )}
            {!user && (
                <>
                    <button className="signinup" onClick={signUp}>sign-up</button>
                    <button className="signinup" onClick={signIn}>sign-in</button>
                </>
            )}
        </nav>
    );
}

export default Navigation;