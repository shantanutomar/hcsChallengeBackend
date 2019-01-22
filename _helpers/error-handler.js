/*
Error handling for different rest calls
*/
module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }
  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }
  if (err.name === "TokenExpiredError") {
    // JWT Token expiration scenario
    return res.status(401).json();
  }
  // default to 500 server error
  return res
    .status(500)
    .json({ message: "Application error : " + err.message });
}
