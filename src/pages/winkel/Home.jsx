import React, {useEffect, useState} from 'react';
import './Winkel.css';
import GenreList from "../../components/RawgComponents/GenreList.jsx";
import GlobalApi from "../../Services/GlobalApi.jsx";
import Banner from "../../components/RawgComponents/Banner.jsx";
import GamesByGenresId from "../../components/RawgComponents/GamesByGenresId.jsx";
import Categorieen from "../../components/RawgComponents/Categorieen.jsx";
import SearchBar from "../../components/RawgComponents/SearchBar.jsx";
import { useNavigate } from 'react-router-dom';

function Home() {
    const [allGameList, setAllGameList] = useState();
    const [gameListByGenres, setGameListByGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllGamesList();
    }, [])

    const getAllGamesList = () => {
        GlobalApi.getGamesWithParams({})
            .then((response) => {
                setAllGameList(response.data.results);
                setGameListByGenres(response.data.results);
            });
    }

    const handleGenreToggle = (genreId) => {
        navigate('/search', {
            state: {
                selectedGenres: new Set([genreId]),
                activeCategory: 'popular',
                searchQuery: ''
            }
        });
    }

    const handleSearch = (searchTerm) => {
        navigate('/search', {
            state: {
                selectedGenres: new Set(),
                activeCategory: 'popular',
                searchQuery: searchTerm
            }
        });
    }

    const handleCategorySelect = (categoryId) => {
        navigate('/search', {
            state: {
                selectedGenres: new Set(),
                activeCategory: categoryId,
                searchQuery: ''
            }
        });
    }

    return (
        <>
            <div className="gridCol2">
                <div className="home-sidebar">
                    Genre
                    <Categorieen
                        setCategory={handleCategorySelect}
                        activeCategory="popular"
                    />
                    <GenreList
                        selectedGenres={new Set()}
                        onGenreToggle={handleGenreToggle}
                    />
                </div>
                <div className="homepage-container">
                    <div className="searchbar home">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="gameListing">
                        <h2 className="description">Uitgelicht</h2>
                        {allGameList?.length > 0 && gameListByGenres.length > 0 ?
                            <div>
                                <div className="banner">
                                    <Banner
                                        images={allGameList.slice(0, 5).map(game => game.background_image)}
                                        games={allGameList.slice(0, 5)}
                                        imageCount={5}
                                        interval={5000}
                                    />
                                </div>
                                <GamesByGenresId gameList={gameListByGenres}/>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;