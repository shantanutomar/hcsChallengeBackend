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
router.delete("/:taskId", deleteUserTask);

module.exports = router;

function createTask(req, res, next) {
  // console.log(req);
  taskService
    .createTask(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function updateTask(req, res, next) {
  taskService
    .updateTask(req.params.taskId, req.body)
    .then(tasks => res.json({ tasks }))
    .catch(err => next(err));
}

function deleteUserTask(req, res, next) {
  taskService
    .deleteUserTask(req.params.taskId)
    .then(tasks => res.json({ tasks }))
    .catch(err => next(err));
}
