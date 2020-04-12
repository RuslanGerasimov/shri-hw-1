const path = require('path');
const fs = require('fs');
const { checkIfDirExists, deleteDir } = require('../../helpers/fs.js');

describe('test file helpers', function() {
    describe('check if checkIfDirExists works correct', function() {
        it('should create dir', function(done) {
            checkIfDirExists(path.resolve(__dirname, 'someFolder'))
                .then(() => { done() })
                .catch(done)
        });

        it('should create subDir in folder that exist', function(done) {
            checkIfDirExists(path.resolve(__dirname, 'someFolder/subDir'))
                .then(() => { done() })
                .catch(done)
        });

        it('shouldn\'t create subDir in folder that doesn\'t exist', function(done) {
            checkIfDirExists(path.resolve(__dirname, 'someFolder2/subDir'))
                .then(done)
                .catch(() => { done() })
        });
    });

    describe('check deleteDir func', function () {
        it('should delete folder that exist', function (done) {
            const dir = path.resolve(__dirname, 'someFolder');
            checkIfDirExists(dir)
                .then(() => {
                    deleteDir(dir).then(() => {
                        fs.access(dir, function(err) {
                            if(err && err.code === 'ENOENT') {
                                done();
                            } else {
                                done('error. dir exists');
                            }
                        })
                    })
                })
        })
    })
});