import React from 'react';
import './Navigation.css';
import {NavLink} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";
import PageIcon from "../header/MyLogo.jsx";

function Navigation() {
    const navigate = useNavigate();

    const signUp = () => {
        navigate('/whitening'); // Replace with your desired route
    };

    const signIn = () => {
        navigate('/whitening'); // Replace with your desired route
    };

  return (
      <nav>
          <PageIcon icon={logo} title="Logos" />
          <div className="nav-container">
              <ul>
                  <li><NavLink to="/"
                               className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Winkel</NavLink>
                  </li>
                  <li><NavLink to="/bibliotheek"
                               className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Bibliotheek</NavLink>
                  </li>
                  <li><NavLink to="/account"
                               className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Account</NavLink>
                  </li>
              </ul>
          </div>
          <button className="signinup" onClick={signUp}>sign-up</button>
          <button className="signinup" onClick={signIn}>sign-in</button>
      </nav>
  );
}

export default Navigation;