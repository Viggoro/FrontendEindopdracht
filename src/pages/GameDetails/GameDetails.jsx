import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../Services/GlobalApi';

function GameDetails() {
    const { id } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGameDetails();
    }, [id]);

    const getGameDetails = () => {
        setLoading(true);
        GlobalApi.getGameDetails(id)
            .then((response) => {
                setGameDetails(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching game details:', error);
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (!gameDetails) return <div>Game not found</div>;

    return (
        <div className="game-details-container p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{gameDetails.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img
                        src={gameDetails.background_image}
                        alt={gameDetails.name}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p>{gameDetails.description_raw}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Details</h2>
                        <p><strong>Release Date:</strong> {gameDetails.released}</p>
                        <p><strong>Rating:</strong> {gameDetails.rating}/5</p>
                        <p><strong>Platforms:</strong> {gameDetails.platforms?.map(p => p.platform.name).join(', ')}</p>
                        <p><strong>Genres:</strong> {gameDetails.genres?.map(g => g.name).join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetails;