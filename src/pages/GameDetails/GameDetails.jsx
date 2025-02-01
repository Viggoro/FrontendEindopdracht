import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../Services/GlobalApi';
import Banner from '../../components/RawgComponents/Banner';  // Make sure this import path is correct
import './GameDetails.css';

function GameDetails() {
    const { id } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGameDetails();
    }, [id]);

    const getGameDetails = () => {
        setLoading(true);
        GlobalApi.getGameDetails(id)
            .then((response) => {
                setGameDetails(response.data);
                if (response.data.slug) {
                    return getGameScreenshots(response.data.slug);
                }
            })
            .catch((error) => {
                console.error('Error fetching game details:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getGameScreenshots = (slug) => {
        return GlobalApi.getGameScreenshots(slug)
            .then((response) => {
                if (response.data.results && response.data.results.length > 0) {
                    setScreenshots(response.data.results);
                }
            })
            .catch((error) => {
                console.error('Error fetching screenshots:', error);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (!gameDetails) return <div>Game not found</div>;

    return (
        <div className="game-details-container">
            <h1 className="game-title">{gameDetails.name}</h1>


            {screenshots.length > 0 && (
                <div className="game-banner-section">
                    <Banner
                        images={screenshots.map(screenshot => screenshot.image)}
                        imageCount={screenshots.length}
                        interval={0} // 3 sec
                    />
                </div>
            )}

            <div className="game-content">
                <div className="game-info-section">
                    <p>{gameDetails.description_raw}</p>
                </div>
                <div>
                    <div className="game-info-section">
                        <p className="game-info-text">
                            <span className="game-info-label">Release Date:</span> {gameDetails.released}
                        </p>
                        <p className="game-info-text">
                            <span className="game-info-label">Rating:</span> {gameDetails.rating}/5
                        </p>
                        <p className="game-info-text">
                            <span className="game-info-label">Platforms:</span> {gameDetails.platforms?.map(p => p.platform.name).join(', ')}
                        </p>
                        <p className="game-info-text">
                            <span className="game-info-label">Genres:</span> {gameDetails.genres?.map(g => g.name).join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetails;