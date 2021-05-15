const { check, body, param } = require('express-validator/check');

module.exports = {

    checkLogin: [
        body('mobile').exists().withMessage('must be provided'),
        body('fullName').exists().withMessage('must be provided'),
    ]
}