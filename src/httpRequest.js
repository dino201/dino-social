import axios from "axios";


export const makeRequest = axios.create({
    // baseURL: "https://social-api-beg6.onrender.com/api/",
    baseURL: "http://localhost:5000/api/",
    withCredentials: true,
});