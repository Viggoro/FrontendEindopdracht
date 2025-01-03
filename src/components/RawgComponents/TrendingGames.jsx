import React, {useEffect} from 'react';

function TrendingGames({gameList}) {
    useEffect(() => {
        console.log(gameList);
    }, [])
    return (
        <div>
            {gameList.map((item, index) => index < 10 && (
                <div>
                    <img src={item.background_image}/>
                    <h2>{item.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default TrendingGames;