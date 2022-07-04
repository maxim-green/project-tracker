const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(ApiError.unauthorized('Not authorized.'))
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next()
  } catch (e) {
    return next(ApiError.unauthorized('Not authorized.'))
  }
}
