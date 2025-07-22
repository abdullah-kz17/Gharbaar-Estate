import axios from 'axios';

const API_BASE_URL = import.meta.env.API_PRODUCTION_PORT || import.meta.env.API_DEVELOPMENT_PORT;

export const axiosPublic = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const axiosPrivate = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically add token to each request
axiosPrivate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);