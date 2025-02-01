import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBox from "../../components/Account/FormBox.jsx";
import { useAuth } from '../../context/AuthContext';
import './SignIn.css';
import { NavLink } from "react-router-dom";

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            await login(formData.email, formData.password);
            navigate('/account');
        } catch (err) {
            setError(err.message || 'Er is een fout opgetreden bij het inloggen.');
        }
    };

    return (
        <div className="app-container signin">
            <FormBox title="Inloggen">
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Wachtwoord
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Inloggen
                    </button>
                    <NavLink to="/signup" className="make-account">Account maken</NavLink>
                </form>
            </FormBox>
        </div>
    );
}

export default SignIn;