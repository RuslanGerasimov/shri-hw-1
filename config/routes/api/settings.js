const {Router} = require('express');
const router = Router();
const { addNewCommitsToBuildQue, checkRepository } = require("../../../backend/api/builds");
const { getSettings, saveSettings } = require("../../../backend/api/settings");

const { cloneRepository } = require('../../../backend/main/git');

router.get('/settings', function (req, res) {
    getSettings()
        .then((data) => { res.json(data) })
        .catch((err) => { res.status(400).json(err) })
});

router.post('/settings', (req, res) => {
    const {repoName, buildCommand, mainBranch, period} = req.body;
    saveSettings(repoName, buildCommand, mainBranch, period)
        .then(() => {
            res.status(200).json("ok");
            cloneRepository(req.body.repoName)
        })
        .then(() => { return addNewCommitsToBuildQue() })
        .then((data) => {
            if(data.period) {
                setTimeout(checkRepository, data.period * 60 * 1000);
            }
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;