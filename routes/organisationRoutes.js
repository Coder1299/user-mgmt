'use strict';

var express = require('express');

var router = express.Router();

var organisationController = require('../controllers/organisationController');

var errorHandler = require('../validators/errorHandler');

//  create organisation
router.post('/create', errorHandler.run, organisationController.createOrganisation);

router.get('/list-users/:id',errorHandler.run, organisationController.listOrgUsers);

router.put('/join-request', errorHandler.run, organisationController.createRequest);

router.put('/approve-request/:id', errorHandler.run, organisationController.approveJoinRequest);

router.put('/delink-user/:id', errorHandler.run,organisationController.delinkUser);

module.exports = router;
