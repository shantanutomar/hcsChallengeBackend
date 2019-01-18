const express = require("express");
const router = express.Router();
const taskService = require("./task.service");

/*
Create task
Delete task
Update Task
Fetch All tasks
Register/Create User
Authentiate User
*/

router.post("/", createTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", _deleteUserTask);

module.exports = router;

function createUserTask(req, res, next) {
  taskService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

// function getAllUserTasks(req, res, next) {
//   userService
//     .getAll()
//     .then(users => res.json(users))
//     .catch(err => next(err));
// }

// function updateUserTask(req, res, next) {
//   userService
//     .update(req.params.id, req.body)
//     .then(() => res.json({}))
//     .catch(err => next(err));
// }

// function _deleteUserTask(req, res, next) {
//   userService
//     .delete(req.params.id)
//     .then(() => res.json({}))
//     .catch(err => next(err));
// }
