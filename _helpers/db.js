const config = require("config.json");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  function(err) {
    if (err) {
      console.log("Problem with the connection is: " + err);
    } else {
      console.log("The Mongoose connection is ready");
    }
  }
);
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/user.model"),
  Task: require("../tasks/task.model")
};
