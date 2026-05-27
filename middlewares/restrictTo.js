const APIError = require('../utils/apiError');

const restrictTo = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        throw new APIError('Not authorized', 401);
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new APIError('Forbidden', 403);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = restrictTo;
