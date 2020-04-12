const rimraf = require('rimraf');
const fs = require('fs');

const deleteDir = (folder) => new Promise((resolve, reject) => {
    rimraf(folder, function () {
        console.log(...arguments);
        resolve(true)
    });
});

const checkIfDirExists = (dir) => new Promise((resolve, reject) => {
    fs.access(dir, function (err) {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(dir, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            });
        } else {
            resolve(true);
        }
    });
});

module.exports = {
    deleteDir,
    checkIfDirExists
};