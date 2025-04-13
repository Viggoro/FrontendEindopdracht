import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBox from "../../components/Account/FormBox.jsx";
import { useAuth } from '../../context/AuthContext';
import { authAPI } from "../../Services/api.js";
import './SignIn.css';

function ChangePassword() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }
    }, [user, navigate]);

    if (!user) return null;

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
        setSuccess('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Wachtwoorden komen niet overeen');
            return;
        }

        try {
            await authAPI.changePassword(formData.newPassword);
            setSuccess('Wachtwoord succesvol gewijzigd');
            setFormData({
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError(err.message || 'Er is een fout opgetreden bij het wijzigen van het wachtwoord.');
        }
    };

    return (
        <div className="app-container signin">
            <FormBox title="Wachtwoord wijzigen">
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="newPassword" className="form-label">
                            Nieuw wachtwoord invoeren
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                            Wachtwoord bevestigen
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-button">
                        Wachtwoord wijzigen
                    </button>
                </form>
            </FormBox>
        </div>
    );
}

export default ChangePassword; 