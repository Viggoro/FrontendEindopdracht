import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GamesByGenresId from '../../components/RawgComponents/GamesByGenresId.jsx';
import { userAPI } from '../../Services/api';
import { useAuth } from '../../context/AuthContext';
import GlobalApi from '../../Services/GlobalApi.jsx';
import './Bibliotheek.css';

function Bibliotheek() {
    const [libraryGames, setLibraryGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { from: '/bibliotheek' } });
            return;
        }
        
        fetchLibraryGames();
    }, [user, navigate]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredGames(libraryGames);
        } else {
            const filtered = libraryGames.filter(game => 
                game.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredGames(filtered);
        }
    }, [searchTerm, libraryGames]);

    const fetchLibraryGames = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const libraryIds = await userAPI.getUserLibrary();
            
            if (libraryIds.length === 0) {
                setLibraryGames([]);
                setFilteredGames([]);
                setLoading(false);
                return;
            }

            const gamesPromises = libraryIds.map(id => 
                GlobalApi.getGameDetails(id)
                    .then(response => response.data)
                    .catch(err => {
                        console.error(`Failed to fetch game with ID ${id}:`, err);
                        return null;
                    })
            );
            
            const gamesData = await Promise.all(gamesPromises);

            const validGames = gamesData.filter(game => game !== null);
            
            setLibraryGames(validGames);
            setFilteredGames(validGames);
        } catch (error) {
            console.error('Error fetching library games:', error);
            setError('Failed to load your library. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleGameClick = (game) => {
        setSelectedGame(game);
    };

    return (
        <div className="bibliotheek-container">
            <div className="bibliotheek-sidebar">
                <div className="bibliotheek-search">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Zoek in je bibliotheek..."
                        className="bibliotheek-search-input"
                    />
                </div>
                
                {loading ? (
                    <div className="loading-indicator">Games laden...</div>
                ) : error ? (
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={fetchLibraryGames}>Probeer opnieuw</button>
                    </div>
                ) : filteredGames.length === 0 ? (
                    <div className="empty-library">
                        {searchTerm ? (
                            <p>Geen games gevonden voor "{searchTerm}".</p>
                        ) : (
                            <>
                                <p>Je bibliotheek is leeg.</p>
                                <button onClick={() => navigate('/winkel')}>
                                    Ontdek Games
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="bibliotheek-games-list">
                        <GamesByGenresId 
                            gameList={filteredGames} 
                            showWishlist={false} 
                            showCartButton={false}
                        />
                    </div>
                )}
            </div>
            
            <div className="bibliotheek-content">
                {loading ? (
                    <div className="loading-indicator">Games laden...</div>
                ) : error ? (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="bibliotheek-games-grid">
                        <h1>Mijn Games Collectie</h1>
                        <div className="games-grid-container">
                            <GamesByGenresId 
                                gameList={libraryGames}
                                showWishlist={false} 
                                showCartButton={false}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bibliotheek;