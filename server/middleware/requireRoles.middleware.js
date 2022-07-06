const ApiError = require('../error/ApiError');

module.exports = (roles) => (req, res, next) => {
  try {
    roles.forEach(role => {
      if (!req.user.roles.includes(role)) {
        return next(ApiError.forbidden(`Role '${role}' is required for this request`))
      }
    })
    next()
  } catch (e) {
    return next(ApiError.internal(e.message));
  }
}
