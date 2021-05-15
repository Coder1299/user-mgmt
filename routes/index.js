'use strict';

var express = require('express');

var router = express.Router();

// var middlewares = require('../middlewares');

var userRoute = require('./userRoutes');

var organisationRoute = require('./organisationRoutes');

router.use('/users',userRoute);

router.use('/organisations', organisationRoute);

router.all('*', function (req, res) {
    res.status(400)
    res.send('Invalid route');
});

module.exports = router;

