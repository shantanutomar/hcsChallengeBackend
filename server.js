﻿/*
Main server.js file that boots up the server
*/
/* Include .env file before starting local server */
require("dotenv").config();

require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const moment = require("moment");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", (req, res, next) => {
  // JWT token validity check
  jwt(req, res, next);
  req.requestTime = moment.now();
  next();
});

// api routes - Using middlewares
app.use("/users", require("./users/user.controller"));
app.use("/tasks", require("./tasks/task.controller"));

// global error handler
app.use(errorHandler);

// start server
// Port can be changed to config.awsPort for aws deployments
const port =
  process.env.NODE_ENV === "production"
    ? process.env.AWS_PORT
    : process.env.DEV_PORT;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
