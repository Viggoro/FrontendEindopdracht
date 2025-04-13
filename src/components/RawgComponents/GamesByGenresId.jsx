import React, {useEffect, useState} from 'react';
import './GamesByGenresId.css'
import {useNavigate} from "react-router-dom";
import {userAPI} from '../../Services/api';
import {useAuth} from '../../context/AuthContext';
import PropTypes from 'prop-types';
import heartEmoji from '../../assets/Heartemoji.svg';
import driehoek from '../../assets/x.svg';
import cartIcon from '../../assets/cart-icon.svg'; // You'll need to add this SVG to your assets

function GamesByGenresId({gameList, showWishlist = true, useDriehoek = false, showCartButton = true, limit, onUpdate}) {
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (showWishlist) {
                fetchWishlist();
            }
            if (showCartButton) {
                fetchCart();
            }
        }
    }, [user, showWishlist, showCartButton]);
    
    const fetchWishlist = async () => {
        if (!user) return;
        
        try {
            const wishlistData = await userAPI.getUserWishlist();
            setWishlist(wishlistData);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };
    
    const fetchCart = async () => {
        if (!user) return;
        
        try {
            const cartData = await userAPI.getUserCart();
            setCart(cartData);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    
    const handleToggleWishlist = async (e, gameId) => {
        e.stopPropagation();
        
        if (!user) {
            alert('Please log in to add games to your wishlist');
            navigate('/login');
            return;
        }
        
        setIsLoading(true);
        try {
            await userAPI.toggleWishlist(gameId);
            setWishlist(prev => {
                if (prev.includes(gameId)) {
                    return prev.filter(id => id !== gameId);
                } else {
                    return [...prev, gameId];
                }
            });
            onUpdate();
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAddToCart = async (e, gameId) => {
        e.stopPropagation();
        
        if (!user) {
            alert('Please log in to add games to your cart');
            navigate('/login');
            return;
        }
        
        setIsCartLoading(true);
        try {
            await userAPI.addToCart(gameId);
            setCart(prev => {
                if (!prev.includes(gameId)) {
                    return [...prev, gameId];
                }
                return prev;
            });
            onUpdate();
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsCartLoading(false);
        }
    };
    
    const isInWishlist = (gameId) => {
        return wishlist.includes(gameId);
    };
    
    const isInCart = (gameId) => {
        return cart.includes(gameId);
    };

    const filteredGameList = gameList.filter(item => item.background_image !== null);

    const icon = useDriehoek ? driehoek : heartEmoji;

    const limitedGameList = limit ? filteredGameList.slice(0, limit) : filteredGameList;

    return (
        <div>
            {limitedGameList.map((item) => (
                <div className="GameBarContainer"
                     key={item.id}
                >
                    <div 
                        className="GameBarClickable"
                        onClick={() => navigate(`/game/${item.id}`)}
                    >
                        <img className="GameBarImage" src={item.background_image} alt={item.name}/>
                        <div className="GameBarContent">
                            <h2>{item.name}</h2>
                            {item.genres && item.genres.length > 0 && (
                                <h3>{item.genres.map((genre) => genre.name).join(', ')}</h3>
                            )}
                        </div>
                    </div>
                    <div className="GameBarActions">
                        {showCartButton && (
                            <button
                                className={`CartButton ${isInCart(item.id) ? 'InCart' : ''}`}
                                onClick={(e) => handleAddToCart(e, item.id)}
                                disabled={isCartLoading || isInCart(item.id)}
                                title={isInCart(item.id) ? "Already in cart" : "Add to cart"}
                            >
                                <img
                                    src={cartIcon}
                                    alt="Add to cart"
                                    className="CartIcon"
                                />
                                {isInCart(item.id) && <span className="InCartLabel">✓</span>}
                            </button>
                        )}

                        {showWishlist && (
                            <button 
                                className={`WishlistButton ${isInWishlist(item.id) ? 'InWishlist' : ''} ${useDriehoek ? 'TransparentBackground' : ''}`}
                                onClick={(e) => handleToggleWishlist(e, item.id)}
                                disabled={isLoading}
                            >
                                <img 
                                    src={icon} 
                                    alt={isInWishlist(item.id) ? "Remove from wishlist" : "Add to wishlist"}
                                    className="WishlistIcon"
                                />
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

GamesByGenresId.propTypes = {
    gameList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        background_image: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    })).isRequired,
    showWishlist: PropTypes.bool,
    useDriehoek: PropTypes.bool,
    showCartButton: PropTypes.bool,
    limit: PropTypes.number,
    onUpdate: PropTypes.func
};

GamesByGenresId.defaultProps = {
    showWishlist: true,
    useDriehoek: false,
    showCartButton: true
};

export default GamesByGenresId;