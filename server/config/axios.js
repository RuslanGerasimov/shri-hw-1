const axios = require('axios');
const https = require('https');

const instance = axios.create({
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

module.exports = instance;