import axios from "axios";

const key="d4a30d97003f43f6b910cdf8cdf4c18f";
const axiosCreate=axios.create({
    baseURL:'https://api.rawg.io/api'
})

const getGenreList=axiosCreate.get('/genres?key='+key);
const getAllGames=axiosCreate.get('/games?key='+key);
export default {
    getGenreList,
    getAllGames
}