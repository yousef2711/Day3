const jwt = require('jsonwebtoken');
const APIError = require('../utils/apiError');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new APIError('Authentication token missing', 401);
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new APIError('Token expired', 401);
      }
      throw new APIError('Invalid token', 401);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
