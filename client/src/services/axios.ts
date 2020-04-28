import axios, {AxiosInstance} from 'axios';

const apiAxiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export default apiAxiosInstance;