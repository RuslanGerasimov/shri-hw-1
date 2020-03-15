const {Router} = require('express');
const router = Router();
const { fetchBuilds, getBuildLog, fetchDetailBuild, addBuild } = require('../../../backend/api/builds');
const { getSettings } = require('../../../backend/api/settings');
const { getIndividualLog } = require('../../../backend/main/git');

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
    getSettings().then((data) => {
        const { repoName } = data;
        return getIndividualLog(repoName, req.body.commitHash);
    }).then(({author, commitMessage, repoName, commit, branchName}) => {
        return addBuild(commit, author, branchName, commitMessage)
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(err.status).json(err.statusText);
    });
});

//TODO: добавить заглушки для создания билда

module.exports = router;