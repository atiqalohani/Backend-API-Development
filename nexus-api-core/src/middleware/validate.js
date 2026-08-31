const AppError = require('../utils/appError');

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params
  });

  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => ({
      field: err.path.join('.').replace('body.', ''),
      message: err.message
    }));

    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: 'Validation Error',
        details: formattedErrors
      }
    });
  }

  req.validatedData = result.data;
  next();
};

module.exports = validate;
