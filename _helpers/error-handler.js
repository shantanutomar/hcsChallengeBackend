/*
Error handling for different rest calls
*/
module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: "Username already exists" });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "User not authorized" });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
