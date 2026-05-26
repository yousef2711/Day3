const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { convert: true });

    if (error) {
      const details = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: details,
      });
    }

    req.body = value;
    next();
  };
};

module.exports = validationMiddleware;
