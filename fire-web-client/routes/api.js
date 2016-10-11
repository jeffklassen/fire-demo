var express = require('express');
var router = express.Router();
var colors = require('colors');
var Promise = require('promise');
var clientRoutes = express.Router();
var config = require('../config').options;

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('Index page requested, not doing anything.'.yellow);
    res.send("welcome to file land.")
});

clientRoutes.get('/app/', function (req, res, next) {
        res.sendFile('/client/index.html', config);
    });
    clientRoutes.get('/client/*', function (req, res, next) {
        res.sendFile(req.path, config);
    });
    clientRoutes.get('*', function (req, res, next) {
        res.sendFile('/client/index.html', config)
    });


module.exports = clientRoutes;