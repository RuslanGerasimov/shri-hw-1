import { GET_SETTINGS, SET_SETTING, SETTINGS_API_GOING} from './actionTypes';
import apiAxiosInstance from '../../services/axios';
import {Settings} from "./type";
import {ThunkDispatch} from "redux-thunk";


export const fetchSettings = (resolve: (data: boolean) => void, reject: (status: string) => void) => {
    return (dispatch: ThunkDispatch<any, any, any>) => {
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
            });
    }
};


export const saveSettings = (settings: Settings, resolve: (data: any) => void, reject: (errorStatus: string) => void) => {
    return (dispatch: ThunkDispatch<any, any, any>) => {
        apiAxiosInstance.post('/settings', {
            repoName: settings.repo,
            buildCommand: settings.command,
            mainBranch: settings.mainBranch,
            period: +settings.interval
        }).then((result) => {
            resolve(result.data);
            dispatch({
                type: GET_SETTINGS,
                payload: {
                    repo: settings.repo,
                    mainBranch: settings.command,
                    command: settings.mainBranch,
                    interval: +settings.interval
                }
            });
        }).catch((response) => {
            reject(response.status);
            console.log(response.data);
        })
    }
};

export const setSetting = (type: string, value: string) => {
    return {
        type: SET_SETTING,
        payload: {
            type,
            value
        }
    }
};

export const setProcessIsGoing = (val?: boolean) => {
    return {
        type: SETTINGS_API_GOING,
        payload: {
            value: !!val
        }
    }
};