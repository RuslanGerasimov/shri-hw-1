const assert = require('assert');
const path = require('path');
const fs = require('fs');
const {getRepositoryFolder, cloneRepository} = require('../../../backend/main/git.js');

const repoNameExist = 'RuslanGerasimov/shri-hw-1';
const repoNameDoesntExist = 'RuslanGerasimov/shri-hw-8478';
const testRepoDir = path.resolve(__dirname, 'repositories');

describe('test git', function() {
    describe('check folder name of git repo', function() {
        it('should return true if', function() {
            const path = getRepositoryFolder(repoNameExist);
            const windowsPath = path.indexOf('backend\\repositories\\RuslanGerasimov\\shri-hw-1') > 0;
            const linuxPath = path.indexOf('backend/repositories/' + repoNameExist) > 0;
            assert.equal(windowsPath || linuxPath , true);
        });
    });

    describe('check functions that work with git', function () {
        this.timeout(15000);
        it('should create local repository', function(done) {
            cloneRepository(repoNameExist, getRepositoryFolder(repoNameExist, testRepoDir))
                .then(() => {
                    fs.access(getRepositoryFolder(repoNameExist, testRepoDir), function(err) {
                        if(err) {
                            done(err);
                        }
                        done();
                    })
                }).catch((err) => {
                    done(err);
                })
        });

        it('shouldn\'t create local repository', function(done) {
            cloneRepository(repoNameDoesntExist, getRepositoryFolder(repoNameDoesntExist, testRepoDir))
                .then(() => {
                    fs.access(getRepositoryFolder(repoNameDoesntExist, testRepoDir), function(err) {
                        if(err) {
                            done();
                        } else {
                            done(new Error('repo exist'));
                        }
                    })
                }).catch((err) => {
                    done();
                })
        })
    })
});