import axiosApiInstance from "../../config/axios";
import {gitLog, gitPull} from "../main/git";
import {getSettings} from "./settings";
import {AxiosError} from "axios";

export enum BuildStatuses {
    Waiting = 'Waiting',
    InProgress = 'InProgress',
    Success = 'Success',
    Fail = 'Fail',
    Canceled = 'Canceled'
}

export type Build = {
    id:	string,
    buildNumber: number,
    status:	BuildStatuses,
    configurationId: string,
    commitMessage:	string,
    commitHash:	string,
    branchName:	string,
    authorName:	string,
    start?: string,
    duration?: number
}

export type BuildRequest = {
    id:	string,
    buildNumber: number,
    status:	BuildStatuses
}

export const fetchBuilds = (limit: number|undefined = undefined , offset: number|undefined = undefined): Promise<Array<Build>> => {
    return new Promise((resolve, reject) => {
        const query = limit && offset ? `?limit=${+limit}&offset=${+offset}` : "";

        axiosApiInstance.get('/build/list' + query).then((result) => {
            resolve(result.data.data);
        }).catch((err) => {
            reject(err);
        });
    })
};

export const fetchDetailBuild = (buildId: string): Promise<Build> => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.get('/build/details?buildId=' + buildId).then((result) => {
            resolve(result.data.data);
        }).catch((err) => {
            reject(err)
        })
    })
};

export const addBuild = (commit: string, author: string, branchName: string, message: string): Promise<BuildRequest> => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.post("/build/request", {
            commitMessage: message,
            commitHash: commit,
            branchName: branchName,
            authorName: author
        }).then((result) => {
            resolve(result.data.data);
        }).catch((err) => {
            reject(err.response);
        })
    });
};


//По какой-то причине сервер периодически выдает 500 ошибку при постановки билда в очередь.
export const recursiveAddBuilder = (commit: string, author: string, branchName: string, message: string, resolve: (data: any) => void, reject: (data: any) => any): void => {
    addBuild(commit, author, branchName, message).then((data: BuildRequest) => {
        resolve(data);
    }).catch((errResponse) => {
        if (errResponse.status === 500) {
            setTimeout(() => {
                recursiveAddBuilder(commit, author, branchName, message, resolve, reject)
            }, 200)
        } else {
            reject(errResponse);
        }
    })
};


export const addNewCommitsToBuildQue = (branch: string = '', repoName: string = ''): Promise<{status: 'ok', period: number}> => {
    return new Promise(async (resolve, reject) => {
        const config: {branch: string, repoName: string, period?: number} = {
            branch: branch,
            repoName: repoName,
        };

        if (!branch || !repoName) {
            const configData = await getSettings().catch(err => err);

            config.branch = configData.mainBranch;
            config.repoName = configData.repoName;
            config.period = configData.period;
        }

        fetchBuilds()
            .then((builds) => {
                const currentBranch = config.branch;
                const repoName = config.repoName;
                gitLog(repoName, currentBranch).then((commits) => {
                    commits.forEach(async (commit) => {
                        const message = !commit.body ? commit.subject : commit.subject + "\n\n" + commit.body;
                        const hasBeenAdded = builds.reduce((res, build) => {
                            return res || (build.branchName === currentBranch && build.commitHash === commit.commit)//TODO: extend condition (check repoName)
                        }, false);
                        if (!hasBeenAdded) {
                            await (new Promise((resolve, reject) => {
                                recursiveAddBuilder(commit.commit, commit.author, currentBranch, message, resolve, reject);
                            })).then(data => data).catch(err => err);
                        }
                    });
                    resolve({status: "ok", period: config.period ? +config.period : 0});
                })
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            })
    })
};


const timerObject: { timerId: NodeJS.Timeout|null } = {
    timerId: null
};

export const checkRepository: () => void = () => {
    getSettings()
        .then((data) => {
            return {
                repoName: data.repoName,
                mainBranch: data.mainBranch,
                period: data.period
            }
        })
        .then(settings => {
            return gitPull(settings.repoName).then(() => settings);
        })
        .then((settings) => {
            addNewCommitsToBuildQue(settings.mainBranch, settings.repoName).then(() => {
                if (timerObject.timerId) {
                    clearTimeout(timerObject.timerId);
                    timerObject.timerId = null;
                }
                timerObject.timerId = setTimeout(() => {
                    checkRepository()
                }, settings.period * 60 * 1000)
            }).catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
};
export const getBuildLog = (buildId: string): Promise<Build> => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.get(`/build/log?buildId=${buildId}`).then((result) => {
            resolve(result.data);
        }).catch((err) => {
            reject(err);
        })
    });
};

export const startBuilding = (buildId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const date = new Date();
        axiosApiInstance.post('/build/start', { buildId: buildId, dateTime: date.toISOString() }).then(() => {
            resolve(true);
        }).catch((err) => {
            reject(err.response)
        })
    })
};

export const cancelBuilding = (buildId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.post('/build/cancel', { buildId: buildId }).then(() => {
            resolve(true);
        }).catch((err) => {
            reject(err.response)
        })
    })
};

export const finishBuilding = (buildId: string, duration: number, isSuccess: boolean, buildLog: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const data = {
            buildId: buildId,
            duration: duration,
            success: isSuccess,
            buildLog: buildLog
        };

        axiosApiInstance.post('/build/finish', data).then(() => {
            resolve(true);
        }).catch((err) => {
            reject(err.response)
        })
    })
};