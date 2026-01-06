import axios from "axios"
import { config } from "./config"

export const getAllMovies = () => {
    return axios.get(`${config.server}/movie/all`)
}

export const getMovieById = (id) => {
    return axios.get(`${config.server}/movie/${id}`)
}