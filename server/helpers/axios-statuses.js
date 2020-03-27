const sendJsonSuccess = (res, result) => {
    res.status(result.status).json(result.data);
    return Promise.resolve(result.data);
};

const sendJsonError = (res, err) => {
    res.status(err.response.status).json({
        error: err.response.statusText,
        status: err.response.status,
        data: err.response.data
    });
};


/**
 * @param {{code: string, compulsory: boolean}[]} fields
 * @param {axios} axiosInstance
 * @param {string} endpoint
 * @param {axios.request} req
 * @param {axios.response} res
 */
const postEndpointProcess = (fields, axiosInstance, endpoint, req, res) => {
    return new Promise((resolve, reject) => {
        const bodyParams = req.body;
        let emptyParams = [];
        const data = fields.reduce((res, field) => {
            if (bodyParams.hasOwnProperty(field.code)) {
                res[field.code] = bodyParams[field.code];
            } else if (field.compulsory) {
                emptyParams.push(field.code);
            }
            return res;
        }, {});

        if (emptyParams.length > 0) {
            reject({status: 422, error: `${emptyParams.join(', ')} are required`});
            return res.status(422).json({error: `${emptyParams.join(', ')} are required`});
        }

        axiosInstance.post(endpoint, data)
            .then((result) => {
                sendJsonSuccess(res, result);
                resolve(result.data);
            }).catch((err) => {
                reject(err.response.data);
                sendJsonError(res, err);
            })
    })
};

module.exports = {
    sendJsonSuccess,
    sendJsonError,
    postEndpointProcess
};