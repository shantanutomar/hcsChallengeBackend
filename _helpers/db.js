/*
DB config file with mongoDB. 
*/
const config = require("config.json");
const mongoose = require("mongoose");
var redis = require("redis");

mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  function(err) {
    if (err) {
      console.log("mongoDB connection issue: " + err);
      throw err;
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
mongoose.Promise = global.Promise;

const redisConnect = () => {
  var client = redis.createClient(
    17951,
    "redis-17951.c1.ap-southeast-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
  );
  client.auth("FD5JDX93iiJjl5bEOCimDSIFhBW9DQgY", function(err) {
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
