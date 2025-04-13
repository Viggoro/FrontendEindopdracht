import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GamesByGenresId from '../../components/RawgComponents/GamesByGenresId.jsx';
import { userAPI } from '../../Services/api';
import { useAuth } from '../../context/AuthContext';
import GlobalApi from '../../Services/GlobalApi.jsx';
import SearchBar from '../../components/RawgComponents/SearchBar.jsx';
import './ShoppingCart.css';

function ShoppingCart() {
    const [cartGames, setCartGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { from: '/cart' } });
            return;
        }
        
        fetchCartGames();
    }, [user, navigate]);

    const fetchCartGames = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const cartIds = await userAPI.getUserCart();
            
            if (cartIds.length === 0) {
                setCartGames([]);
                setLoading(false);
                return;
            }

            const gamesPromises = cartIds.map(id => 
                GlobalApi.getGameDetails(id)
                    .then(response => response.data)
                    .catch(err => {
                        console.error(`Failed to fetch game with ID ${id}:`, err);
                        return null;
                    })
            );
            
            const gamesData = await Promise.all(gamesPromises);

            const validGames = gamesData.filter(game => game !== null);
            
            setCartGames(validGames);
        } catch (error) {
            console.error('Error fetching cart games:', error);
            setError('Failed to load your shopping cart. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = async () => {
        if (cartGames.length === 0) {
            alert('Your cart is empty. Please add games before checking out.');
            return;
        }
        
        setCheckoutLoading(true);
        try {
            await userAPI.checkout();

            alert('Checkout successful! The games have been added to your library.');

            setCartGames([]);

            navigate('/bibliotheek');
        } catch (error) {
            console.error('Error during checkout:', error);
            setError('Failed to complete checkout. Please try again later.');
        } finally {
            setCheckoutLoading(false);
        }
    };

    const handleRemoveFromCart = async (gameId) => {
        try {
            await userAPI.removeFromCart(gameId);
            setCartGames(prev => prev.filter(game => game.id !== gameId));
        } catch (error) {
            console.error('Error removing game from cart:', error);
            setError('Failed to remove game from cart. Please try again.');
        }
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Shopping Cart</h1>
            </div>

            {loading ? (
                <div className="loading-indicator">Loading your shopping cart...</div>
            ) : error ? (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={fetchCartGames}>Try Again</button>
                </div>
            ) : cartGames.length === 0 ? (
                <div className="empty-cart">
                    <p>Your shopping cart is empty.</p>
                    <button onClick={() => navigate('/')}>
                        Explore Games
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-summary">
                        <div className="cart-info">
                            <p>Items in cart: <strong>{cartGames.length}</strong></p>
                            <p>Total: <strong>€00,00</strong></p>
                        </div>
                        <button 
                            className="checkout-button"
                            onClick={handleCheckout}
                            disabled={checkoutLoading}
                        >
                            {checkoutLoading ? 'Processing...' : 'Checkout'}
                        </button>
                    </div>
                    <div className="cart-games">
                        <div className="cart-items-list">
                            {cartGames.map(game => (
                                <div key={game.id} className="cart-item">
                                    <div className="cart-item-info">
                                        <h3>{game.name}</h3>
                                        <p className="cart-item-price">€00,00</p>
                                    </div>
                                    <button 
                                        className="remove-button"
                                        onClick={() => handleRemoveFromCart(game.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ShoppingCart;