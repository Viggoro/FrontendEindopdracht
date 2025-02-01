import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBox from "../../components/Account/FormBox.jsx";
import { useAuth } from '../../context/AuthContext';
import './SignUp.css';
import {authAPI} from "../../Services/api.js";

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordconfirm: ''
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
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

        if (formData.password !== formData.passwordconfirm) {
            setError('Wachtwoorden komen niet overeen');
            return;
        }

        try {
            authAPI.register(formData)
            navigate('/account');
        } catch (err) {
            setError(err.message || 'Er is een fout opgetreden bij het registreren.');
        }
    };

    return (
        <div className="app-container signup">
            <FormBox title="Account aanmaken">
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
                    <div className="form-group">
                        <label htmlFor="passwordconfirm" className="form-label">
                            Wachtwoord bevestigen
                        </label>
                        <input
                            type="password"
                            id="passwordconfirm"
                            name="passwordconfirm"
                            value={formData.passwordconfirm}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Account aanmaken
                    </button>
                </form>
            </FormBox>
        </div>
    );
}


export default SignUp;