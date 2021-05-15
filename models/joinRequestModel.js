'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JoinRequestSchema = new Schema({

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    organisation: {
        type: Schema.Types.ObjectId,
        ref: 'Organisation',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('JoinRequest', JoinRequestSchema);