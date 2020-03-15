const path = require('path');
const {spawn} = require('child_process');
const {StringDecoder} = require('string_decoder');

const repositoriesDir = path.resolve(__dirname, '..', 'repositories');
const getRepositoryFolder = repositoryName => path.resolve(repositoriesDir, repositoryName);

const cloneRepository = (repositoryName) => {
    return new Promise((resolve, reject) => {
        const child = spawn('git', ['clone', `https://github.com/${repositoryName}`, getRepositoryFolder(repositoryName)], {
            "cwd": repositoriesDir
        });
        child.on('exit', (code, text) => {
            if (!code) {
                return resolve(true)
            }
            reject({code, text});
        })
    })
};

const getCommitParam = (repoName, commitHash, type) => {
    return new Promise((resolve, reject) => {
        const params = {
            body: '%B',
            author: '%aN',
            dateTime: '%cI',
            commitHash: '%H'
        };
        let output = "";
        const childProcess = spawn('git', ['show', commitHash, '--quiet', `--pretty=${params[type]}`], {
            "cwd": getRepositoryFolder(repoName)
        });
        const decoder = new StringDecoder('utf8');
        childProcess.stdout.on('data', function (bufferData) {
            const data = decoder.write(bufferData);
            output += data;
        });
        childProcess.on('exit', function (code, message) {
            if (!code) {
                return resolve({
                    type: type,
                    value: output
                });
            }
            reject({code, message});
        })
    })
};

const getCommitBranch = (repoName, commitHash) => {
  return new Promise((resolve, reject) => {
      const use = "git branch --contains <commit>";
      resolve("TEST");//TODO: Проработать метод
  })
};


const getIndividualLog = (commitHash, repoName) => {
    return new Promise((resolve, reject) => {
        Promise.all([
            getCommitParam(repoName, commitHash, 'body'),
            getCommitParam(repoName, commitHash, 'author'),
            getCommitBranch(repoName, commitHash),
        ]).then((promiseResults) => {
            const commitMessage = promiseResults.filter(result => result.type === 'body')[0].value;
            const author = promiseResults.filter(result => result.type === 'author')[0].value;
            const branch = promiseResults.filter(result => result.type === 'branch')[0].value;
            resolve({ author, commitMessage, repoName, commit: commitHash, branchName: branch });
        }).catch((err) => {
            reject(err);
        })

    });
};

const gitLog = (repositoryName, branchName) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn('git', ['log', branchName, '--pretty=%H%n%s%n%aN%n%cI%n%b', '--reverse'], {
            "cwd": getRepositoryFolder(repositoryName)
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
                        res[res.length - 1]['date'] = line;
                        break;
                    case 3:
                        res[res.length - 1]['author'] = line;
                        break;
                    case 4:
                        res[res.length - 1]['body'] = line;
                        break;
                }
                counter++;
                if (!line && counter > 4) {
                    counter = 0;
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

const gitPull = (repositoryName) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn('git', ['pull'], {
            "cwd": getRepositoryFolder(repositoryName)
        });
        childProcess.on('exit', (code) => {
            if (!code) {
                resolve(true);
            } else {
                reject(code);
            }
        })
    });
};

module.exports = {cloneRepository, gitLog, gitPull, getIndividualLog};