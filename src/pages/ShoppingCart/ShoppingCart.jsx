import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GamesByGenresId from '../../components/RawgComponents/GamesByGenresId.jsx';
import { userAPI } from '../../Services/api';
import { useAuth } from '../../context/AuthContext';
import GlobalApi from '../../Services/GlobalApi.jsx';
import SearchBar from '../../components/RawgComponents/SearchBar.jsx';
import './Wishlist.css';

function Wishlist() {
    const [wishlistGames, setWishlistGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { from: '/wishlist' } });
            return;
        }
        
        fetchWishlistGames();
    }, [user, navigate]);

    const fetchWishlistGames = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Get the user's wishlist IDs
            const wishlistIds = await userAPI.getUserWishlist();
            
            if (wishlistIds.length === 0) {
                setWishlistGames([]);
                setLoading(false);
                return;
            }
            
            // Fetch game details for each ID in the wishlist
            const gamesPromises = wishlistIds.map(id => 
                GlobalApi.getGameDetails(id)
                    .then(response => response.data)
                    .catch(err => {
                        console.error(`Failed to fetch game with ID ${id}:`, err);
                        return null;
                    })
            );
            
            const gamesData = await Promise.all(gamesPromises);
            
            // Filter out any failed requests
            const validGames = gamesData.filter(game => game !== null);
            
            setWishlistGames(validGames);
        } catch (error) {
            console.error('Error fetching wishlist games:', error);
            setError('Failed to load your wishlist. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        navigate('/search', {
            state: {
                selectedGenres: new Set(),
                activeCategory: 'popular',
                searchQuery: searchTerm
            }
        });
    };

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h1>My Wishlist</h1>
                <div className="searchbar">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>

            {loading ? (
                <div className="loading-indicator">Loading your wishlist...</div>
            ) : error ? (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={fetchWishlistGames}>Try Again</button>
                </div>
            ) : wishlistGames.length === 0 ? (
                <div className="empty-wishlist">
                    <p>Your wishlist is empty.</p>
                    <button onClick={() => navigate('/winkel')}>
                        Explore Games
                    </button>
                </div>
            ) : (
                <div className="wishlist-games">
                    <GamesByGenresId gameList={wishlistGames} showWishlist={true} useDriehoek={true} />
                </div>
            )}
        </div>
    );
}

export default Wishlist; 