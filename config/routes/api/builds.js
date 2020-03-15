const {Router} = require('express');
const router = Router();
const { fetchBuilds, getBuildLog, fetchDetailBuild, addBuild } = require('../../../backend/api/builds');

router.get('/builds', function (req, res) {
    fetchBuilds().then((result) => {
        res.status(result.status).json(result.data);
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
        res.status(result.status).json(result.data.data);
    }).catch((err) => {
        res.status(err.status).json(err.statusText);
    })
});

router.post('/builds/:commitHash', (req, res) => {
    const {commitMessage, commitHash, branchName, authorName} = req.body;
    addBuild(commitHash, authorName, branchName, commitMessage).then((result) => {
        res.status(result.status).json(result.data.data);
    }).catch((err) => {
        res.status(err.status).json(err.statusText);
    });
});

module.exports = router;