const errorHandler = (err, req, res, next) => {
  console.error("❌❌ Error middleware:", err);
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((item) => item.message);
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID",
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      status: "error",
      message: `${field} already exists`,
    });
  }

  // APIError with statusCode
  if (err.name === 'APIError' || err.statusCode) {
    const status = err.statusCode || 500;
    return res.status(status).json({ status: 'error', message: err.message });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ status: 'error', message: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ status: 'error', message: 'Token expired' });
  }

  const message = err.message || "Something went wrong";
  res.status(500).json({
    status: "error",
    message,
  });
};

module.exports = errorHandler;