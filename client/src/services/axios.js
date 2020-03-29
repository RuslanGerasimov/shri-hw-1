import axios from 'axios';

const apiAxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export default apiAxiosInstance;