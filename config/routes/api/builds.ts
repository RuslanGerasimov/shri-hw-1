import {Request, Response, Router} from "express";
import {getIndividualLog} from "../../../backend/main/git";
import {getSettings} from "../../../backend/api/settings";
import {
    addBuild,
    cancelBuilding,
    fetchBuilds,
    fetchDetailBuild,
    finishBuilding,
    getBuildLog,
    startBuilding
} from "../../../backend/api/builds";
import {AxiosError} from "axios";

const router = Router();




router.get('/builds', function (req: Request<any, any, any, {limit: number|undefined, offset: number|undefined}>, res) {
    fetchBuilds(req.query.limit, req.query.offset).then((result) => {
        res.status(200).json(result);
    }).catch((err: AxiosError) => {
        if(err.response) {
            res.status(err.response.status).json(err.response.statusText);
        } else {
            res.status(500).json('unknown error');
        }
    });
});

router.get('/builds/:buildId', function (req: Request, res: Response) {
    fetchDetailBuild(req.params.buildId).then((result) => {
        res.status(200).json(result);
    }).catch((err: AxiosError) => {
        if(err.response) {
            return res.status(err.response.status).json(err.response.statusText);
        }
        return res.status(500).json('unknown error');
    })
});


router.get('/builds/:buildId/logs', function (req: Request, res: Response) {
    const buildId = req.params.buildId;
    getBuildLog(buildId).then((result) => {
        res.status(200).json(result);
    }).catch((err: AxiosError) => {
        if(err.response) {
            return res.status(err.response.status).json("No logs for this build");
        }
        return res.status(500).json("unknown error");
    })
});

router.post('/builds/:commitHash', (req: Request, res: Response) => {
    getSettings().then((data) => {
        const {repoName} = data;
        return getIndividualLog(req.params.commitHash, repoName);
    }).then(({author, commitMessage, repoName, commit, branchName}) => {
        return addBuild(commit, author, branchName, commitMessage);
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err: {status: number, statusText: string}) => {
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

export default router;