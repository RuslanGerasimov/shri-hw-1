import {Router} from "express";
import Axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";

const router = Router();
const axios: AxiosInstance = Axios.create({
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
        .then((result: AxiosResponse) => {
            res.json(result.data);
        }).catch((err: AxiosError) => {
            res.json({
                error: err.response && err.response.statusText ? err.response.statusText : "error",
                code: err.response && err.response.status ? err.response.status : "error",
                data: err.response && err.response.data ? err.response.data : "error",
            })
        })
});

export default router;
