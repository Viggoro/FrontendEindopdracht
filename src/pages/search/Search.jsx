import React, {useEffect, useState} from 'react';
import './Search.css';
import GenreList from "../../components/RawgComponents/GenreList.jsx";
import GlobalApi from "../../Services/GlobalApi.jsx";
import GamesByGenresId from "../../components/RawgComponents/GamesByGenresId.jsx";
import Categorieen from "../../components/RawgComponents/Categorieen.jsx";
import SearchBar from "../../components/RawgComponents/SearchBar.jsx";
import { useLocation } from 'react-router-dom';

function Search() {
    const location = useLocation();
    const [allGameList, setAllGameList] = useState();
    const [gameListByGenres, setGameListByGenres] = useState([]);
    const [activeCategory, setActiveCategory] = useState(
        location.state?.activeCategory || 'popular'
    );
    const [selectedGenres, setSelectedGenres] = useState(
        location.state?.selectedGenres || new Set()
    );
    const [searchQuery, setSearchQuery] = useState(
        location.state?.searchQuery || ''
    );

    useEffect(() => {
        getAllGamesList();
        if (location.state?.searchQuery) {
            fetchGamesWithCurrentFilters(selectedGenres, location.state.searchQuery);
        } else {
            fetchGamesWithCurrentFilters();
        }
    }, []);

    const getAllGamesList = () => {
        GlobalApi.getGamesWithParams({})
            .then((response) => {
                setAllGameList(response.data.results);
            });
    }

    const handleGenreToggle = (genreId) => {
        setSelectedGenres(prevGenres => {
            const newGenres = new Set(prevGenres);
            if (newGenres.has(genreId)) {
                newGenres.delete(genreId);
            } else {
                newGenres.add(genreId);
            }
            fetchGamesWithCurrentFilters(newGenres, searchQuery);
            return newGenres;
        });
    }

    const handleSearch = (searchTerm) => {
        setSearchQuery(searchTerm);
        fetchGamesWithCurrentFilters(selectedGenres, searchTerm);
    }

    const fetchGamesWithCurrentFilters = (genres = selectedGenres, search = searchQuery) => {
        const params = {};

        switch(activeCategory) {
            case 'new':
                params.ordering = 'released';
                break;
            case 'popular':
                break;
            case 'free':
                params.tags = 'free-to-play';
                break;
        }

        if (genres.size > 0) {
            params.genres = Array.from(genres).join(',');
        }

        if (search) {
            params.search = search;
        }

        GlobalApi.getGamesWithParams(params)
            .then((response) => {
                setGameListByGenres(response.data.results);
            });
    }

    const handleCategorySelect = (categoryId) => {
        setActiveCategory(categoryId);
        setSearchQuery('');
        fetchGamesWithCurrentFilters();
    }

    return (
        <div className="search-wrapper">
            <section>
                <div className="home-sidebar search">
                    <Categorieen
                        setCategory={handleCategorySelect}
                        activeCategory={activeCategory}
                    />
                </div>
                <div className="home-sidebar search">
                    <GenreList
                        selectedGenres={selectedGenres}
                        onGenreToggle={handleGenreToggle}
                    />
                </div>
            </section>
            <div className="homepage-container search">
                <div className="gameBanner">
                    {allGameList?.length > 0 && gameListByGenres.length > 0 ?
                        <div>
                            <section id="search-and-sort" className="search-and-sort">
                                <SearchBar
                                    onSearch={handleSearch}
                                    defaultValue={location.state?.searchQuery || ''}
                                />
                            </section>
                            <GamesByGenresId gameList={gameListByGenres}/>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    );
}

export default Search;