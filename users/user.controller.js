/*
Controller for user handling rests calls
*/

const express = require("express");
const router = express.Router();
const moment = require("moment");
const userService = require("./user.service");

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
  userService
    .getAllUserTasks(req.params)
    .then(tasks => {
      console.log(
        "Fetch all user tasks request took " +
          (moment.now() - req.requestTime + " ms")
      );
      res.json(tasks);
    })
    .catch(err => next(err));
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
