const axiosApiInstance = require('../../config/axios');
const {gitLog, gitPull} = require("../main/git");
const {getSettings} = require('./settings');

const fetchBuilds = (limit = null, offset = null) => {
    return new Promise((resolve, reject) => {
        const query = limit || offset ? `?limit=${+limit}&offset=${+offset}` : "";

        axiosApiInstance.get('/build/list' + query).then((result) => {
            resolve(result.data.data);
        }).catch((err) => {
            reject(err.response);
        });
    })
};

const fetchDetailBuild = (buildId) => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.get('/build/detail', {buildId: buildId}).then((result) => {
            resolve(result.data.data);
        }).catch((err) => {
            reject(err.response)
        })
    })
};

const addBuild = (commit, author, branchName, message) => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.post("/build/request", {
            commitMessage: message,
            commitHash: commit,
            branchName: branchName,
            authorName: author
        }).then((result) => {
            resolve("ok");
        }).catch((err) => {
            reject(err.response);
        })
    });
};


//По какой-то причине сервер периодически выдает 500 ошибку при постановки билда в очередь.
const recursiveAddBuilder = (commit, author, branchName, message, resolve, reject) => {
    addBuild(commit, author, branchName, message).then((data) => {
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


const addNewCommitsToBuildQue = (branch = null, repoName = null) => {
    return new Promise(async (resolve, reject) => {
        const config = {
            branch: branch,
            repoName: repoName,
        };

        if (!branch || !repoName) {
            const configData = await getSettings()
                .catch(err => err);

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
                                recursiveAddBuilder(commit.commit, commit.author, currentBranch, message, resolve, reject)
                                    .then(() => { console.log("ok") })
                                    .catch((err) => { console.log(err) });
                            })).then(data => data).catch(err => err);
                        }
                    });
                    resolve({status: "ok", period: config.period});
                })
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            })
    })
};


const timerObject = {
    timerId: null
};

const checkRepository = () => {
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
                    checkRepository(timerObject)
                }, settings.period * 60 * 1000)
            }).catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
};
const getBuildLog = (buildId) => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.get(`/build/log?buildId=${buildId}`).then((result) => {
            resolve(result.data);
        }).catch((err) => {
            reject(err.response);
        })
    });
};

const startBuilding = (buildId, dateTime) => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.post('/build/start', { buildId: buildId, dateTime: dateTime }).then(() => {
            resolve(true);
        }).catch((err) => {
            reject(err.response)
        })
    })
};

const cancelBuilding = (buildId) => {
    return new Promise((resolve, reject) => {
        axiosApiInstance.post('/build/cancel', { buildId: buildId }).then(() => {
            resolve(true);
        }).catch((err) => {
            reject(err.response)
        })
    })
};

const finishBuilding = (buildId, duration, isSuccess, buildLog) => {
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


module.exports = {
    getBuildLog,
    fetchBuilds,
    addBuild,
    recursiveAddBuilder,
    addNewCommitsToBuildQue,
    checkRepository,
    fetchDetailBuild,
    startBuilding,
    finishBuilding,
    cancelBuilding
};