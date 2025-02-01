import React, {useEffect} from 'react';
import './GamesByGenresId.css'
import {useNavigate} from "react-router-dom";

function GamesByGenresId({gameList}) {
    useEffect(() => {
        console.log("GameList",gameList);
    }, [])

    const navigate = useNavigate();
    const filteredGameList = gameList.filter(item => item.background_image !== null);

    return (
        <div>
            {filteredGameList.map((item) => (
                <div className="GameBarContainer"
                     onClick={() => navigate(`/game/${item.id}`)}
                     key={item.id}
                >
                    <img className="GameBarImage" src={item.background_image} alt={item.name}/>
                    <div className="GameBarContent">
                        <h2>{item.name}</h2>
                        {item.genres && item.genres.length > 0 && (
                            <h3>{item.genres.map((genre) => genre.name).join(', ')}</h3>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GamesByGenresId;