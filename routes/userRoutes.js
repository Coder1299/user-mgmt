'use strict';

var express = require('express');

var router = express.Router();

var userController = require('../controllers/userController');

var errorHandler = require('../validators/errorHandler');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var singleUpload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}).single('file');

//  login - provide mobile number
router.post('/login', errorHandler.run, userController.login);

// get profile
router.get('/profile', errorHandler.run, userController.getProfile);


module.exports = router;
