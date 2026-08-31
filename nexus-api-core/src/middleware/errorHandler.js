const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  if (statusCode === 500) {
    logger.error(`[Unhandled Error] ${err.stack}`);
  } else {
    logger.warn(`[Client Error] ${statusCode} - ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode,
      message: message
    }
  });
};

module.exports = errorHandler;
