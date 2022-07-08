const ApiError = require('../error/ApiError');

module.exports = (roles, requireAll) => (req, res, next) => {
  try {
    if (requireAll) {
      roles.forEach(role => {
        if (!req.user.roles.includes(role)) {
          return next(ApiError.forbidden(`All of roles required for this request: ${roles.join(', ')}`))
        }
      })
    } else {
      let match = false;
      roles.forEach(role => {
        if (req.user.roles.includes(role)) {
          match = true;
        }
      })
      if (!match) {
        return next(ApiError.forbidden(`One of roles required for this request: ${roles.join(', ')}`))
      }
    }

    next()
  } catch (e) {
    return next(ApiError.internal(e.message));
  }
}
