import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
    // baseURL: 'https://api.umaestro.fr',
    baseURL: 'http://localhost:3000',
});

client.interceptors.request.use(function (config: AxiosRequestConfig) {
    config.headers ??= {};
    config.headers.Authorization = 'Bearer ' + (localStorage.getItem('access_token') || '');
    return config;
});

export default client;
