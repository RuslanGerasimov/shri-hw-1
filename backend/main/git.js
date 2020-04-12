const path = require('path');
const {spawn} = require('child_process');
const {StringDecoder} = require('string_decoder');
const { deleteDir, checkIfDirExists } = require('../../helpers/fs');

const repositoriesDir = path.resolve(__dirname, '..', 'repositories');
const getRepositoryFolder = (repositoryName, repositoryFolder = repositoriesDir) => path.resolve(repositoryFolder, repositoryName);

const cloneRepository = (repositoryName, repositoryFolder = null) => {
    return new Promise((resolve, reject) => {
        repositoryFolder = !repositoryFolder ? getRepositoryFolder(repositoryName) : repositoryFolder;

        Promise.all([deleteDir(repositoryFolder), checkIfDirExists(repositoriesDir)])
            .then(() => {
                const child = spawn('git', ['clone', `https://github.com/${repositoryName}`, repositoryFolder], {
                    "cwd": repositoriesDir
                });
                let error = "";
                const decoder = new StringDecoder('utf8');
                child.stderr.on('data', function (buffer) {
                    error += decoder.write(buffer);
                });
                child.on('exit', (code) => {
                    if (!error || !code) {
                        return resolve(true);
                    } else {
                        deleteDir(repositoryFolder).finally(() => {reject(error);})
                    }
                })

            })
            .catch((err) => {
                console.log(err);
                deleteDir(repositoryFolder).finally(() => {reject(err);});
            })
    })
};

const getCommitParam = (repoName, commitHash, type, repoDir = repositoriesDir) => {
    return new Promise((resolve, reject) => {
        const params = {
            body: '%B',
            author: '%aN',
            dateTime: '%cI',
            commitHash: '%H'
        };
        let output = "";

        const childProcess = spawn('git', ['show', commitHash, '--quiet', `--pretty=${params[type]}`], {
            "cwd": getRepositoryFolder(repoName, repoDir)
        });
        const decoder = new StringDecoder('utf8');
        childProcess.stdout.on('data', function (bufferData) {
            const data = decoder.write(bufferData);
            output += data;
        });

        childProcess.on('error', function (err) {
            reject(...arguments);
        });

        childProcess.on('exit', function (code, message) {
            if (!code) {
                return resolve({
                    type: type,
                    value: output.trim()
                });
            }
            reject({code, message});
        })
    })
};

const getCommitBranch = (repoName, commitHash, repoDir = repositoriesDir) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn('git', ['branch', '--contains', commitHash, '-r'], {
            "cwd": getRepositoryFolder(repoName, repoDir)
        });
        childProcess.stdout.on('data', (buffer) => {
            const decoder = new StringDecoder('utf8');
            let data = decoder.write(buffer);
            data = data.trim().split("\n");
            let firstBranch = data.shift();
            resolve({type: "branch", value: firstBranch.split(' ').pop().trim()});
        });
        childProcess.stderr.on('data', (buffer) => {
            const decoder = new StringDecoder('utf8');
            let data = decoder.write(buffer);
            reject(data);
        });
    })
};


const getIndividualLog = (commitHash, repoName, repoDir = repositoriesDir) => {
    return new Promise((resolve, reject) => {
        Promise.all([
            getCommitParam(repoName, commitHash, 'body', repoDir),
            getCommitParam(repoName, commitHash, 'author', repoDir),
            getCommitBranch(repoName, commitHash, repoDir)
        ]).then((promiseResults) => {
            const commitMessage = promiseResults.filter(result => result.type === 'body')[0].value;
            const author = promiseResults.filter(result => result.type === 'author')[0].value;
            const branch = promiseResults.filter(result => result.type === 'branch')[0].value;
            resolve({author, commitMessage, repoName, commit: commitHash, branchName: branch});
        }).catch((err) => {
            reject({status: 404, statusText: "can't fetch commit"});
        })

    });
};

const gitLog = (repositoryName, branchName, repoDir = repositoriesDir) => {
    return new Promise((resolve, reject) => {
        const origin = branchName.indexOf('origin') === 0 ? branchName : 'origin/' + branchName;
        const childProcess = spawn('git', ['log', origin, '--pretty=%H%n%s%n%aN%n%cI%n%b', '--reverse'], {
            "cwd": getRepositoryFolder(repositoryName, repoDir)
        });
        const decoder = new StringDecoder('utf8');
        const arData = [];
        childProcess.stdout.on('data', function (data) {
            const commits = decoder.write(data);
            let counter = 0;
            const commitsParsed = commits.split("\n").reduce((res, line) => {
                switch (counter) {
                    case 0:
                        if (!line) {
                            return res
                        }
                        res.push({});
                        res[res.length - 1]['commit'] = line;
                        break;
                    case 1:
                        res[res.length - 1]['subject'] = line;
                        break;
                    case 2:
                        res[res.length - 1]['author'] = line;
                        break;
                    case 3:
                        res[res.length - 1]['date'] = line;
                        break;
                    case 4:
                        res[res.length - 1]['body'] = line;
                        break;
                }
                counter++;
                if (!line && counter > 4) {
                    counter = 0;
                } else if (counter > 4) {
                    res[res.length - 1]['body'] += "\n" + line;
                    res[res.length - 1]['body'] = res[res.length - 1]['body'].trim();
                }
                return res;
            }, []);

            commitsParsed.forEach((commit) => {
                arData.push(commit)
            });
        });

        childProcess.stderr.on('data', function (error) {
            console.log('error', decoder.write(error))
        });
        childProcess.on('exit', function (code, text) {
            if (!code) {
                resolve(arData);
            } else {
                reject({code: code, text: text});
            }
        });
    })
};

const gitPull = (repositoryName, repoDir = repositoriesDir) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn('git', ['pull'], {
            "cwd": getRepositoryFolder(repositoryName, repoDir)
        });
        childProcess.on('exit', (code) => {
            if (!code) {
                resolve(true);
            } else {
                reject(code);
            }
        });
        childProcess.on('error', (error) => {
            reject(error);
        })
    });
};

module.exports = {cloneRepository, gitLog, gitPull, getIndividualLog, getCommitBranch, getRepositoryFolder, getCommitParam};