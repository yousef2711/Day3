const success = (res, status, message, data) => {
  return res.status(status).json({
    status: "success",
    message,
    data,
  });
};

const error = (res, status, message) => {
  return res.status(status).json({
    status: "error",
    message,
  });
};

module.exports = {
  success,
  error,
};
