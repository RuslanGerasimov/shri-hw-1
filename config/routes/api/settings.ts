import {Router} from "express";
import {cloneRepository} from "../../../backend/main/git";
import {getSettings, saveSettings, Settings} from "../../../backend/api/settings";
import {addNewCommitsToBuildQue, checkRepository} from "../../../backend/api/builds";

const router = Router();

router.get('/settings', function (req, res) {
    getSettings()
        .then((data) => { res.json(data) })
        .catch((err) => { res.status(400).json(err) })
});

router.post('/settings', (req: {body: Settings}, res) => {
    const {repoName, buildCommand, mainBranch, period} = req.body;
    saveSettings(repoName, buildCommand, mainBranch, period)
        .then(() => cloneRepository(req.body.repoName))
        .then(() => {
            res.status(200).json("ok");
            return addNewCommitsToBuildQue()
        })
        .then((data) => {
            if(data.period) {
                setTimeout(checkRepository, data.period * 60 * 1000);
            }
        })
        .catch((err) => {
            res.status(404).json({status: 404,statusText: err});
        })
});

export default router;