import React, {useEffect, useState} from 'react';
import GlobalApi from "../../Services/GlobalApi.jsx";

function GenreList({ selectedGenres, onGenreToggle }) {
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
            <h2>‎ ‎ ‎ ‎ GenreList‎ ‎ ‎ ‎ ‎ ‎</h2>
            {genreList.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onGenreToggle(item.id)}
                    className={`home-sidebar ${selectedGenres.has(item.id) ? 'selected' : ''}`}
                >
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default GenreList;