const { validationResult } = require("express-validator");
// const logger = require("../utils/logger").get("ERRORS");

module.exports.run = function (req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	// logger.error(errors.array(), req.body);
	if (!errors.isEmpty()) {
		let msg = errors.array()[0] && errors.array()[0].msg;
		let statusCode = 400;
		let message = errors.array()[0].param + ': ' + msg;
		if (msg.indexOf('-|-') > -1) {
			statusCode = +msg.split('-|-')[0];
			message = msg.split('-|-')[1];
		}
		return res.status(statusCode).json({
			success: false,
			message: message
		});
	} else {
		next();
	}
};