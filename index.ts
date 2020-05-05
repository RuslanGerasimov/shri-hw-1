import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import {config} from "dotenv";
config();

import apiSettingsRoute from "./config/routes/api/settings";
import apiBuildsRoute from "./config/routes/api/builds";
import testRoute from "./config/routes/test-api";
import {checkRepository} from "./backend/api/builds";


const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use('/static', express.static('public/build/static'));
app.use('/sw.js', express.static('public/build/sw.js'));
app.use('/api', apiSettingsRoute, apiBuildsRoute);
app.use('/test-api', testRoute);
app.use('*', (req, res) => {
    res.sendFile(path.join(path.resolve(__dirname, 'public', 'build', 'index.html')));
});

const server = app.listen(process.env.SERVER_PORT, function () {
    console.log(`App listening on port ${process.env.SERVER_PORT}!`);
    checkRepository();
});
// @ts-ignore