/*
Controller for user handling rests calls
*/

const express = require("express");
const router = express.Router();
const moment = require("moment");
const userService = require("./user.service");
const db = require("_helpers/db");
const redisClient = db.redisClient;

router.post("/authenticate", authenticateUser);
router.post("/register", createUser);
router.get("/:userId/tasks", getAllUserTasks);
router.get("/:userId", getUserById);

module.exports = router;

function authenticateUser(req, res, next) {
  userService
    .authenticateUser(req.body)
    .then(user => {
      console.log(
        "Login user request took " + (moment.now() - req.requestTime + " ms")
      );
      redisClient.del("allTasks");
      res.json(user);
    })
    .catch(err => next(err));
}
function createUser(req, res, next) {
  userService
    .createUser(req.body)
    .then(user => {
      console.log(
        "Register user request took " + (moment.now() - req.requestTime + " ms")
      );

      res.status(200).json({ message: "User has been created", user });
    })
    .catch(err => next(err));
}

function getAllUserTasks(req, res, next) {
  redisClient.get("allTasks", (err, reply) => {
    if (err) {
      redisClient.del("allTasks");
      next(err);
    } else if (reply) {
      console.log(
        "Fetch all user tasks via cache took " +
          (moment.now() - req.requestTime + " ms")
      );
      res.status(200).json(JSON.parse(reply));
    } else {
      userService
        .getAllUserTasks(req.params)
        .then(tasks => {
          redisClient.set("allTasks", JSON.stringify(tasks));
          console.log(
            "Fetch all user tasks via mongoDB took " +
              (moment.now() - req.requestTime + " ms")
          );
          res.status(200).json(tasks);
        })
        .catch(err => {
          redisClient.del("allTasks");
          next(err);
        });
    }
  });
}

function getUserById(req, res, next) {
  userService
    .getUserById(req.params.userId)
    .then(user => {
      console.log(
        "Get one user request took " + (moment.now() - req.requestTime + " ms")
      );
      user ? res.json(user) : res.sendStatus(404);
    })
    .catch(err => next(err));
}
