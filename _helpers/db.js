const config = require("config.json");
const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.connect(
  config.connectionString,
  function(err) {
    // {
    if (err) {
      console.log("Some problem with the connection " + err);
    } else {
      console.log("The Mongoose connection is ready");
    }
  }
);

// mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/user.model")
};
