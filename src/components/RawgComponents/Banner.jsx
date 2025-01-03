import React, {useEffect} from 'react';

function Banner({gameBanner}) {
    useEffect(() => {
    }, [])
    return (
        <div>
            <img className="bannerImg" src={gameBanner.background_image}/>
        </div>
    )
}

export default Banner;