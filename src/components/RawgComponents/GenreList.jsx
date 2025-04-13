import React, {useEffect, useState} from 'react';
import GlobalApi from "../../Services/GlobalApi.jsx";
import './GenreList.css';
import PropTypes from 'prop-types';

function GenreList({ selectedGenres, onGenreToggle, showCheckboxes }) {
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        getGenreList();
    }, [])

    const getGenreList = () => {
        GlobalApi.getGenreList.then((response) => {
            setGenreList(response.data.results);
        })
    }

    return (
        <div>
            <h2 className="GenreList">‎ ‎ ‎ ‎ GenreList‎ ‎ ‎ ‎ ‎ ‎</h2>
            {genreList.map((item) => (
                <div
                    key={item.id}
                    className={`home-sidebar ${selectedGenres.has(item.id) ? 'selected' : ''}`}
                    onClick={!showCheckboxes ? () => onGenreToggle(item.id) : undefined}
                >
                    {showCheckboxes ? (
                        <label className="genre-checkbox-label">
                            <input 
                                type="checkbox" 
                                checked={selectedGenres.has(item.id)}
                                onChange={() => onGenreToggle(item.id)}
                                className="genre-checkbox"
                            />
                            <p>{item.name}</p>
                        </label>
                    ) : (
                        <p>{item.name}</p>
                    )}
                </div>
            ))}
        </div>
    )
}

GenreList.propTypes = {
    selectedGenres: PropTypes.instanceOf(Set).isRequired,
    onGenreToggle: PropTypes.func.isRequired,
    showCheckboxes: PropTypes.bool
};

GenreList.defaultProps = {
    showCheckboxes: false
};

export default GenreList;