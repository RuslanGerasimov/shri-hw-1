const assert = require('chai').assert;
const path = require('path');
const fs = require('fs');
const {
    getRepositoryFolder,
    cloneRepository,
    getCommitParam,
    getCommitBranch,
    getIndividualLog,
    gitLog,
    gitPull
} = require('../../../backend/main/git.js');

const repoNameExist = 'RuslanGerasimov/shri-hw-1';
const commitHashExist = 'da8d00343e0076303a699f699c69bd1d456db5d1';
const commitHashNo = 'da8d0034123076303a699f699c69bd1d456db5d1';
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

    describe('check functions can clone', function () {
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
    });

    describe('can getInfo by branch', function() {
        it('should retrun commit author', function(done) {
            getCommitParam(repoNameExist, commitHashExist, 'author', testRepoDir)
                .then((ans) => {
                    assert.deepStrictEqual(ans, { type: 'author', value: 'Gerasimov Ruslan' });
                    done();
                }).catch((err) => {
                    done(err);
                })
        });

        it('shouldn\'t retrun commit author', function(done) {
            getCommitParam(repoNameExist, commitHashNo, 'author', testRepoDir)
                .then((ans) => {
                    done(new Error('somehow returned author of commit that doesn\'t exist'));
                }).catch((err) => {
                    done();
                })
        });

        it('should fail since try to get unknown prop', function(done) {
            getCommitParam(repoNameExist, commitHashExist, 'author2', testRepoDir)
                .then(() => {
                    done(new Error('somehow returned a value'));
                }).catch((err) => {
                    done();
                })
        });

        it('should return branch of commit', function(done) {
            getCommitBranch(repoNameExist, commitHashExist, testRepoDir)
                .then((ans) => {
                    assert.deepStrictEqual(ans, { type: 'branch', value: 'origin/master' });
                    done();
                }).catch((err) => {
                    done(err);
                })
        });

        it('should fail since set wrong branch branch of commit', function(done) {
            getCommitBranch(repoNameExist, commitHashExist, testRepoDir)
                .then((ans) => {
                    assert.deepStrictEqual(ans, { type: 'branch', value: 'origin/production' });
                    done(new Error('branch is origin/production but should me origin/master'));
                }).catch((err) => {
                    done();
                })
        });

        it('should fail since commit doesn\'t exist', function(done) {
            getCommitBranch(repoNameExist, commitHashNo, testRepoDir)
                .then(() => {
                    done(new Error('passed commit hash that doesn\'t exist but result provided'));
                }).catch(() => {
                    done();
                });
        });
    });

    describe('check getIndividualLog function', function() {
        it('should return correct object', function(done) {
            getIndividualLog(commitHashExist, repoNameExist, testRepoDir)
                .then((commitInfo) => {
                    assert.property(commitInfo, 'author');
                    assert.property(commitInfo, 'commitMessage');
                    assert.propertyVal(commitInfo, 'repoName', repoNameExist);
                    assert.propertyVal(commitInfo, 'commit', commitHashExist);
                    assert.property(commitInfo, 'branchName');
                    done();
                }).catch((err) => {
                    done(err);
                })
        });

        it('should return correct error', function(done) {
            getIndividualLog(commitHashNo, repoNameExist, testRepoDir)
                .then(() => {
                    done(new Error('should return error since commit doesn\'t exist'));
                }).catch(() => {
                    done();
                })
        });
    });

    describe('check giLog function', function() {
        it('return correct object', function (done) {
            gitLog(repoNameExist, 'master', testRepoDir)
                .then((ans) => {
                    assert.isArray(ans);
                    const item = ans.pop();
                    assert.property(item, 'author');
                    assert.property(item, 'subject');
                    assert.property(item, 'commit');
                    assert.property(item, 'date');
                    done();
                }).catch((err) => {
                    done(err)
                })
        });

        it('fail since brnach doesn\'t exist', function (done) {
            gitLog(repoNameExist, 'master2', testRepoDir)
                .then((ans) => {
                    done(ans);
                }).catch(() => {
                    done()
                })
        })
    })

    describe('check git pull', function() {
        this.timeout(5000);
        it('should fetch', function(done) {
            gitPull(repoNameExist, testRepoDir)
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err)
                })
        });

        it('should fail', function(done) {
            gitPull(repoNameDoesntExist, testRepoDir)
                .then(() => {
                    done(new Error(repoNameDoesntExist + ' but it was pulled'));
                }).catch(() => {
                    done()
                })
        });
    })
});