/*
Validates JWT authentication
*/

const jwt = require("jsonwebtoken");
const fs = require("fs");
const config = require("../config.json");

module.exports = jwtAuth = (req, res, next) => {
  if (req.path !== "/users/authenticate" && req.path !== "/users/register") {
    const publicKEY = fs.readFileSync("_helpers/public.key", "utf8");
    try {
      var legit = jwt.verify(req.headers.authorization.slice(7), publicKEY, {
        expiresIn: config.jwtTokenValidity,
        algorithm: ["RS256"]
      });
    } catch (err) {
      throw err;
    }
  }
};
