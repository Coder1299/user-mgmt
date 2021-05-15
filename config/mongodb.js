const mongoose = require('mongoose');
require('dotenv').config()
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

require('../models/organisationModel');
require('../models/userModel');
require('../models/joinRequestModel');

module.exports = {
    models: {
        User: mongoose.model('User'),
        Organisation: mongoose.model('Organisation'),
        JoinRequest: mongoose.model('JoinRequest')
    }
}