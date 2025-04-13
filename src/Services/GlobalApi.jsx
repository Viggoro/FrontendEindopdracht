import axios from "axios";

const key="d4a30d97003f43f6b910cdf8cdf4c18f";
const axiosCreate=axios.create({
    baseURL:'https://api.rawg.io/api'
})

const getGamesWithParams = (params) => {
    let urlParams = `key=${key}`;

    for (const [key, value] of Object.entries(params)) {
        urlParams += `&${key}=${value}`;
    }

    console.log('API URL being called:', `/games?${urlParams}`);
    return axiosCreate.get(`/games?${urlParams}`);
};

const getGenreList=axiosCreate.get('/genres?key='+key);
const getGameDetails=(gameId)=>axiosCreate.get(`/games/${gameId}?key=`+key);
const getGameScreenshots=(slug)=>axiosCreate.get(`/games/${slug}/screenshots?key=`+key);

export default {
    getGenreList,
    getGamesWithParams,
    getGameDetails,
    getGameScreenshots
}