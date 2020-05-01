import ErrnoException = NodeJS.ErrnoException;

const rimraf = require('rimraf');
const fs = require('fs');

export const deleteDir: (f: string) => Promise<boolean> = (folder) => new Promise((resolve, reject) => {
    rimraf(folder, function () {
        resolve(true)
    });
});

export const checkIfDirExists: (dir: string) => Promise<boolean> = (dir) => new Promise((resolve, reject) => {
    fs.access(dir, function (err: ErrnoException) {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(dir, function (err: ErrnoException) {
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