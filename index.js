require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { checkRepository }  = require('./backend/main/build/buildFuncs');

const timer = { timerId: null };

const staticRoute = require('./config/routes/static/index');
const apiSettingsRoute = require('./config/routes/api/settings');
const apiBuildsRoute = require('./config/routes/api/builds');
const testRoute = require('./config/routes/test-api');

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/', staticRoute);
app.use('/api', apiSettingsRoute, apiBuildsRoute);
app.use('/test-api', testRoute);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

checkRepository();