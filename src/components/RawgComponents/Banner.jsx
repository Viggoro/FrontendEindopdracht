import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';
import Driehooek from "../../assets/Driehoek.svg";

function Banner({ images, games, imageCount = 1, interval = 3000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (images && images.length > 1 && interval > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === Math.min(images.length - 1, imageCount - 1) ? 0 : prevIndex + 1
                );
            }, interval);

            return () => clearInterval(timer);
        }
    }, [images, imageCount, interval]);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Math.min(images.length - 1, imageCount - 1) : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === Math.min(images.length - 1, imageCount - 1) ? 0 : prevIndex + 1
        );
    };

    if (!images || images.length === 0) {
        return <div>No images available</div>;
    }

    return (
        <div className="banner-container">
            <img
                className="banner-image"
                src={images[currentIndex]}
                alt={`Banner ${currentIndex + 1}`}
                onClick={() => games && games[currentIndex] && navigate(`/game/${games[currentIndex].id}`)}
                style={{ cursor: 'pointer' }}
            />
            {images.length > 1 && (
                <>
                    <img
                        src={Driehooek}
                        className="nav-arrow left"
                        onClick={handlePrevious}
                        alt="Previous"
                    />
                    <img
                        src={Driehooek}
                        className="nav-arrow right"
                        onClick={handleNext}
                        alt="Next"
                    />
                    <div className="banner-indicators">
                        {images.slice(0, Math.min(images.length, imageCount)).map((_, index) => (
                            <div
                                key={index}
                                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Banner;