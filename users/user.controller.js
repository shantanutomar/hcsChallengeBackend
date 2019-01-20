const express = require("express");
const router = express.Router();
const userService = require("./user.service");

// routes
router.post("/authenticate", authenticateUser);
router.post("/register", createUser);
router.get("/:userId/tasks", getAllUserTasks);
router.get("/:userId", getUserById);

module.exports = router;

function authenticateUser(req, res, next) {
  userService
    .authenticateUser(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
}

function createUser(req, res, next) {
  // console.log(req.body);
  userService
    .createUser(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAllUserTasks(req, res, next) {
  console.log(req);
  userService
    .getAllUserTasks(req.params)
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getUserById(req, res, next) {
  userService
    .getUserById(req.params.userId)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}
