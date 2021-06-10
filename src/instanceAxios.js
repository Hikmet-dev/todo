import axios from 'axios';

export const instanceHeroku = axios.create({
    baseURL: process.env.REACT_APP_LINK
})