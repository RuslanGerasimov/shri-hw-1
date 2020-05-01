import axiosApiInstance from "../../config/axios";

export type Settings = {
    repoName: string,
    buildCommand: string,
    mainBranch: string,
    period: number
};

export const getSettings = (): Promise<Settings> => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.get('/conf').then((result: {data: { data: Settings }}) => {
            if(result.data.data) {
                return resolve(result.data.data);
            }
            reject({ status: 404, statusText: "empty" })
        }).catch((error) => {
            reject({ status: error.response.status, statusText: error.response.statusText });
        })
    })
};

export const saveSettings = (repoName: string, buildCommand: string, mainBranch: string, period: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.post('/conf', {repoName, buildCommand, mainBranch, period})
            .then(() =>  { resolve(true) } )
            .catch((err) => { reject(err) });
    })
};