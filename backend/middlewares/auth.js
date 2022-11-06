const jwt = require('jsonwebtoken');
const { ERROR_MESSAGES } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(ERROR_MESSAGES.AUTHORIZATION_REQUIRED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET-KEY');
  } catch (err) {
    return next(new UnauthorizedError(ERROR_MESSAGES.AUTHORIZATION_REQUIRED));
  }

  req.user = payload;

  return next();
};
