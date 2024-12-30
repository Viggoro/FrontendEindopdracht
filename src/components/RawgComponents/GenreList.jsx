import React, {useEffect, useState} from 'react';
import GlobalApi from "../../Services/GlobalApi.jsx";

function GenreList() {

    const [genreList, setGenreList] = useState([])
    useEffect(() => {
        getGenreList();
    }, [])
    const getGenreList = () => {
        GlobalApi.getGenreList.then((response) => {
            console.log(response.data.results);
            setGenreList(response.data.results);
        })
    }
    return (
        <div>
            <h2 className="SidebarH2">GenreList</h2>
            {genreList.map((item)=>(
                <div>
                    <h3>{item.name}</h3>
                </div>
            ))}
        </div>
    )
}

export default GenreList;