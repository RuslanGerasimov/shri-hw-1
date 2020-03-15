const path = require('path');
const { spawn } = require('child_process');
const { StringDecoder } = require('string_decoder');

const repositoriesDir = path.resolve(__dirname, '..', 'repositories');
const getRepositoryFolder = repositoryName => path.resolve(repositoriesDir, repositoryName);

const cloneRepository = (repositoryName) => {
    return new Promise((resolve, reject) => {
         const child = spawn('git', ['clone', `https://github.com/${repositoryName}`, getRepositoryFolder(repositoryName)], {
            "cwd" : repositoriesDir
        });
         child.on('exit', (code, text) => {
             if(!code) {
                 return resolve(true)
             }
             reject({code, text});
         })
    })
};

const gitLog = (repositoryName, branchName, cb) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn('git', ['log', branchName, '--pretty=%H%n%s%n%b%n%aN%n%cI%n', '--reverse'], {
            "cwd" : getRepositoryFolder(repositoryName)
        });
        const decoder = new StringDecoder('utf8');
        const arData = [];
        childProcess.stdout.on('data', function (data) {
            const commits = decoder.write(data);
            let counter = 0;
            const commitsParsed = commits.split("\n").reduce((res, line) => {
                switch (counter) {
                    case 0:
                        if(!line) {
                            return res
                        }
                        res.push({});
                        res[res.length - 1]['commit'] = line;
                        break;
                    case 1:
                        res[res.length - 1]['subject'] = line;
                        break;
                    case 2:
                        res[res.length - 1]['body'] = line;
                        break;
                    case 3:
                        res[res.length - 1]['author'] = line;
                        break;
                    case 4:
                        res[res.length - 1]['date'] = line;
                        break;
                }
                counter++;
                if(!line && counter > 4) {
                    counter = 0;
                }
                return res;
            }, []);

            commitsParsed.forEach((commit) => { arData.push(commit) });
        });

        childProcess.stderr.on('data', function (error) {
            console.log('error', decoder.write(error))
        });
        childProcess.on('exit', function (code, text) {
            if(!code) {
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
            "cwd" : getRepositoryFolder(repositoryName)
        });
        childProcess.on('exit', (code) => {
            if(!code) {
                resolve(true);
            } else {
                reject(code);
            }
        })
    });
};

module.exports = { cloneRepository, gitLog, gitPull };