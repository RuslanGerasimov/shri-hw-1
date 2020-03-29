require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { checkRepository }  = require('./backend/api/builds');

const apiSettingsRoute = require('./config/routes/api/settings');
const apiBuildsRoute = require('./config/routes/api/builds');
const testRoute = require('./config/routes/test-api');

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use('/static', express.static('public/build/static'));
app.use('/api', apiSettingsRoute, apiBuildsRoute);
app.use('/test-api', testRoute);
app.use('*',  (req,res) =>{
    res.sendFile(path.join(path.resolve(__dirname, 'public', 'build', 'index.html')));
});

app.listen(process.env.SERVER_PORT, function () {
    console.log(`App listening on port ${process.env.SERVER_PORT}!`);
});

checkRepository();