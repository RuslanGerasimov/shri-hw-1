require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { checkRepository }  = require('./backend/api/builds');

const apiSettingsRoute = require('./config/routes/api/settings');
const apiBuildsRoute = require('./config/routes/api/builds');
const testRoute = require('./config/routes/test-api');

app.use(bodyParser.json());

app.use('/static', express.static('public'));
app.use('/api', apiSettingsRoute, apiBuildsRoute);
app.use('/test-api', testRoute);

app.listen(process.env.SERVER_PORT, function () {
    console.log(`App listening on port ${process.env.SERVER_PORT}!`);
});

checkRepository();