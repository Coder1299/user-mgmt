'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrganisationSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users' 
    },

    location: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    }


}, { timestamps: true });

module.exports = mongoose.model('Organisation', OrganisationSchema);