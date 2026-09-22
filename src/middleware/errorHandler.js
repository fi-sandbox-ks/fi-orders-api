const logger = require('../utils/logger');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    logger.error(err.message, { stack: err.stack });
  }
  res.status(statusCode).json({
    error: err.message,
    details: err.details || undefined,
  });
}

module.exports = { errorHandler };
