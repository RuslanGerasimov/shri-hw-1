import {SET_SETTINGS, GET_SETTINGS, SET_SETTING, SETTINGS_API_GOING} from './actionTypes';
import apiAxiosInstance from '../../services/axios';


export const fetchSettings = (resolve, reject) => {
    return (dispatch) => {
        apiAxiosInstance.get('/settings')
            .then((res) => {
                const data = res.data;
                dispatch({
                    type: GET_SETTINGS,
                    payload: {
                        id: data.id,
                        repo: data.repoName,
                        mainBranch: data.mainBranch,
                        command: data.buildCommand,
                        interval: data.period
                    }
                });
                resolve(true);
            })
            .catch((err) => {
                reject(err);
               console.log(err);
            });
    }
};

export const saveSettings = ({repoName, buildCommand, mainBranch, period}, resolve, reject) => {
    return (dispatch) => {
        apiAxiosInstance.post('/settings', {
            repoName,
            buildCommand,
            mainBranch,
            period: +period
        }).then((result) => {
            resolve(result.data);
            dispatch({
                type: GET_SETTINGS,
                payload: {
                    repo: repoName,
                    mainBranch: mainBranch,
                    command: buildCommand,
                    interval: period
                }
            });
        }).catch((response) => {
            reject(response.status);
            console.log(response.data);
        })
    }
};

export const setSetting = (type, value) => {
    return {
        type: SET_SETTING,
        payload: {
            type,
            value
        }
    }
};

export const setProcessIsGoing = (val) => {
    return {
        type: SETTINGS_API_GOING,
        payload: {
            value: !!val
        }
    }
};