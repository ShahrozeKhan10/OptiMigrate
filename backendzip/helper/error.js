const helperFunction = require("../helper/common");

class ErrorHandler extends Error {
  constructor(statusCode, errorCode) {
    super();
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

const handleError = (err, res) => {
  console.log("Error: ", err);
  let { statusCode, errorCode } = err;
  let showErrorCode = true;

  if (!statusCode) {
    statusCode = 500;
    showErrorCode = false;
    return helperFunction.apiResponseWithMessage(null, err, true, 500, res);
  }

  res.status(statusCode).json({
    error: true,
    error_code: showErrorCode ? errorCode : undefined,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
