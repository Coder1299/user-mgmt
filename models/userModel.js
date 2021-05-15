'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({

    fullName: { // full name of the user
        type: String,
        trim: true
    },

    email: { // email of the user
        type: String,
        lowercase: true,
        trim: true
    },

    mobile: { // mobile number of the user.
        type: Number,
        unique: true,
        trim: true,
        required: true
    },

    organisation: {
        type: Schema.Types.ObjectId,
        ref: 'Organizations' 
    },
    
    status: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'INACTIVE']
    }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);