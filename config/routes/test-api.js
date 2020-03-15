const { Router } = require('express');
const router = Router();
const Axios = require('axios');
const axios = Axios.create({
    baseURL: process.env.SERVER_ADDRESS
});

router.get("/settings", function (req, res) {
    const { repoName, buildCommand, mainBranch, period } = req.query;

    const sendData = {
        "repoName": repoName,
        "buildCommand": buildCommand,
        "mainBranch": mainBranch,
        "period": +period
    };

    axios.post(`${process.env.SERVER_ADDRESS}/api/settings`, sendData, {
        headers: {
            common: {
                "Content-Type": "application/json"
            }
        }
    })
        .then((result) => {
            res.json(result.data);
        }).catch((err) => {
            res.json({
                error: err.response && err.response.statusText ? err.response.statusText : "error",
                code: err.response && err.response.status ? err.response.status : "error",
                data: err.response && err.response.data ? err.response.data : "error",
            })
        })
});

module.exports = router;
