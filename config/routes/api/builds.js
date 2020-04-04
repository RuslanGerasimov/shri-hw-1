const {Router} = require('express');
const router = Router();
const {fetchBuilds, getBuildLog, fetchDetailBuild, addBuild, startBuilding, finishBuilding, cancelBuilding} = require('../../../backend/api/builds');
const {getSettings} = require('../../../backend/api/settings');
const {getIndividualLog} = require('../../../backend/main/git');

router.get('/builds', function (req, res) {
    fetchBuilds(req.query.limit, req.query.offset).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(err.status).json(err.statusText);
    });
});

router.get('/builds/:buildId', function (req, res) {
    fetchDetailBuild(req.params.buildId).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(err.status).json(err.statusText);
    })
});


router.get('/builds/:buildId/logs', function (req, res) {
    const buildId = req.params.buildId;
    getBuildLog(buildId).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(err.status).json("No logs for this build");
    })
});

router.post('/builds/:commitHash', (req, res) => {
    getSettings().then((data) => {
        const {repoName} = data;
        return getIndividualLog(req.params.commitHash, repoName);
    }).then(({author, commitMessage, repoName, commit, branchName}) => {
        return addBuild(commit, author, branchName, commitMessage)
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(err.status).json(err.statusText);
    });
});


router.post('/build/request', (req, res) => {
    getSettings().then((data) => {
        const {repoName} = data;
        return getIndividualLog(req.body.commitHash, repoName);
    }).then(({author, commitMessage, repoName, commit, branchName}) => {
        return addBuild(commit, author, branchName, commitMessage)
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(err.status).json(err.statusText);
    });
});

/*router.post('/build/start', (req, res) => {
    const buildId = req.body.buildId;
    const duration = Math.floor(Math.random() * 10000);

    return startBuilding(buildId)
        .then((result) => {
            res.status(200).json(result);
            setTimeout(() => {
                finishBuilding(buildId, duration / 1000, true, 'TEST');
            }, duration);
        }).catch((err) => {
            res.status(err.status).json(err.statusText);
        });
});*/

module.exports = router;