const  axiosApiInstance = require('../../config/axios');

const getSettings = () => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.get('/conf').then((result) => {
            if(result.data.data) {
                return resolve(result.data.data);
            }
            reject({ status: 404, statusText: "empty" })
        }).catch((error) => {
            reject({ status: error.response.status, statusText: error.response.statusText });
        })
    })
};

const saveSettings = (repoName, buildCommand, mainBranch, period) => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.post('/conf', {repoName, buildCommand, mainBranch, period})
            .then(() =>  { resolve(true) } )
            .catch((err) => { reject(err) });
    })
};

module.exports = {
    getSettings,
    saveSettings
};