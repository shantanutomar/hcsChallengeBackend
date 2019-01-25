/*
Controller for task handling rests calls
*/

const express = require("express");
const router = express.Router();
const taskService = require("./task.service");
const moment = require("moment");
const db = require("_helpers/db");
const redisClient = db.redisClient;

router.post("/", createTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteUserTask);

module.exports = router;

function createTask(req, res, next) {
  taskService
    .createTask(req.body)
    .then(task => {
      console.log(
        "Create Task request took " + (moment.now() - req.requestTime + " ms")
      );
      let tasks = [];
      redisClient.get("allTasks", (err, reply) => {
        if (err) throw err;
        else if (reply) {
          tasks = JSON.parse(reply);
          tasks.push(task);
          redisClient.set("allTasks", JSON.stringify(tasks));
        }
      });

      res.json({});
    })
    .catch(err => next(err));
}

function updateTask(req, res, next) {
  taskService
    .updateTask(req.params.taskId, req.body)
    .then(task => {
      console.log(
        "Update Task request took " + (moment.now() - req.requestTime + " ms")
      );
      console.log(task);
      // redisClient.get("allTasks", (err, reply) => {
      //   if (err) throw err;
      //   else if (reply) {
      //     tasks = JSON.parse(reply);
      //     tasks.push(task);
      //     redisClient.set("allTasks", JSON.stringify(tasks));
      //   }

      res.json({ task });
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
      // redisClient.set("allTasks", JSON.stringify(tasks));
      res.json({ tasks });
    })
    .catch(err => next(err));
}
