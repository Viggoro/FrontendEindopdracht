import React from 'react';
import FormBox from "../../components/Account/FormBox.jsx";
import './Account.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
      <div className="app-container account">
        <FormBox title="Account instellingen">
          <form className="login-form">
            <button
                type="button"
                className="account-button"
                onClick={handleChangePassword}
            >
              Wachtwoord wijzigen
            </button>
            <button
                type="button"
                className="submit-button"
                onClick={handleLogout}
            >
              Uitloggen
            </button>
          </form>
        </FormBox>
      </div>
  );
}

export default Account;