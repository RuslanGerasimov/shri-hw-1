import axios, { AxiosInstance} from "axios";
import https from "https";

const instance: AxiosInstance = axios.create({
    baseURL: 'https://hw.shri.yandex/api/',
    headers: {
        common: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Content-Type': 'application/json'
        }
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

export default instance;