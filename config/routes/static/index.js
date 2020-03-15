const path = require('path');
const { Router } = require('express');
const router = Router();
const staticPagesDir = path.resolve(__dirname, '../../..', 'public', 'pages');
router.get('/', function (req, res) {
    res.sendFile(path.resolve(staticPagesDir, 'index.html'));
});

router.get('/settings', function (req, res) {
    res.sendFile(path.resolve(staticPagesDir, 'settings.html'));
});

router.get('/builds', function (req, res) {
    res.sendFile(path.resolve(staticPagesDir, 'list.html'));
});

router.get('/build/:id', function (req, res) {
    console.log(req.params);
    res.sendFile(path.resolve(staticPagesDir, 'detail.html'));
});

module.exports= router;