const ApiError = require('../error/ApiError');
const {validationResult} = require('express-validator');

module.exports = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(ApiError.badRequest('Invalid input data', errors.array()))
  }
  next()
}
