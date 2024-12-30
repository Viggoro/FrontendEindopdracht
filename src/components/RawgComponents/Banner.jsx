import React, {useEffect} from 'react';

function Banner({gameBanner}) {
    useEffect(() => {
        console.log("gameBanner", gameBanner)
    }, [])
    return (
        <div>
            <img className="bannerImg" src={gameBanner.background_image}/>
        </div>
    )
}

export default Banner;