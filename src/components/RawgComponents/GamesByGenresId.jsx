import React, {useEffect} from 'react';

function GamesByGenresId({gameList}) {
    useEffect(() => {
        console.log("GameList",gameList);
    }, [])
    return (
        <div>
            {gameList.map((item) => (
                <div></div>
            ))}
        </div>
    )
}

export default GamesByGenresId;