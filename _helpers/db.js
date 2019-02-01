/*
DB config file with mongoDB. 
*/
const mongoose = require("mongoose");
var redis = require("redis");

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_DB_CONN_STRING);
mongoose.connect(
  process.env.MONGODB_URI || process.env.MONGO_DB_CONN_STRING,
  function(err) {
    if (err) {
      console.log("mongoDB connection issue: " + err);
      throw err;
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

const redisConnect = () => {
  var client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
    {
      no_ready_check: true
    }
  );
  client.auth(process.env.REDIS_PASS, function(err) {
    if (err) {
      console.log("Redis connection issue: " + err);
      throw err;
    }
  });
  client.on("error", function(err) {
    console.log("Redis connection issue: " + err);
    throw err;
  });
  client.on("connect", function() {
    console.log("Connected to Redis Caching");
  });
  return client;
};

const redisClient = redisConnect();

module.exports = {
  User: require("../users/user.model"),
  Task: require("../tasks/task.model"),
  redisClient: redisClient
};
