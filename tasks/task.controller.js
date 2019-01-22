/*
Controller for task handling rests calls
*/

const express = require("express");
const router = express.Router();
const taskService = require("./task.service");
const moment = require("moment");

router.post("/", createTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteUserTask);

module.exports = router;

function createTask(req, res, next) {
  taskService
    .createTask(req.body)
    .then(() => {
      console.log(
        "Create Task request took " + (moment.now() - req.requestTime + " ms")
      );
      res.json({});
    })
    .catch(err => next(err));
}

function updateTask(req, res, next) {
  taskService
    .updateTask(req.params.taskId, req.body)
    .then(tasks => {
      console.log(
        "Update Task request took " + (moment.now() - req.requestTime + " ms")
      );

      res.json({ tasks });
    })
    .catch(err => next(err));
}

function deleteUserTask(req, res, next) {
  taskService
    .deleteUserTask(req.params.taskId)
    .then(tasks => {
      console.log(
        "Delete task request took " + (moment.now() - req.requestTime + " ms")
      );

      res.json({ tasks });
    })
    .catch(err => next(err));
}
