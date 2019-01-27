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
      /** Caching Approach 1 - When any CUD operation takes place delete the redis key and
       * return the response so that on next fetch operation data is fetched from DB itself instead of cache
       */
      redisClient.del("allTasks");
      res.json({});

      /** Caching Approach 2 (Commented below)- When any CUD operation takes place update the cache
       * accordingly with the updated data so that on next fetch data is returned from
       * cache itself rather querying from DB
       */
      // redisClient.get("allTasks", (err, reply) => {
      //   if (err) {
      //     redisClient.del("allTasks");
      //     next(err);
      //   } else if (reply) {
      //     let tasks = JSON.parse(reply);
      //     tasks.push(task);
      //     redisClient.set("allTasks", JSON.stringify(tasks));
      //     res.json({});
      //   }
      // });
    })
    .catch(err => {
      redisClient.del("allTasks");
      next(err);
    });
}

function updateTask(req, res, next) {
  taskService
    .updateTask(req.params.taskId, req.body)
    .then(task => {
      console.log(
        "Update Task request took " + (moment.now() - req.requestTime + " ms")
      );
      /** Caching Approach 1 - When any CUD operation takes place delete the redis key and
       * return the response so that on next fetch operation data is fetched from DB itself instead of cache
       */
      redisClient.del("allTasks");
      res.json({ task });

      /** Caching Approach 2 (Commented below)- When any CUD operation takes place update the cache
       * accordingly with the updated data so that on next fetch data is returned from
       * cache itself rather querying from DB
       */
      // redisClient.get("allTasks", (err, reply) => {
      //   if (err) {
      //     redisClient.del("allTasks");
      //     next(err);
      //   } else if (reply) {
      //     tasks = JSON.parse(reply);
      //     tasks.forEach((ele, index) => {
      //       if (ele._id.toString() === task._id.toString()) {
      //         tasks[index] = task;
      //       }
      //     });
      //     redisClient.set("allTasks", JSON.stringify(tasks));
      //     res.json({ task });
      //   }
      // });
    })
    .catch(err => {
      redisClient.del("allTasks");
      next(err);
    });
}

function deleteUserTask(req, res, next) {
  taskService
    .deleteUserTask(req.params.taskId)
    .then(task => {
      console.log(
        "Delete task request took " + (moment.now() - req.requestTime + " ms")
      );

      /** Caching Approach 1 - When any CUD operation takes place delete the redis key and
       * return the response so that on next fetch operation data is fetched from DB itself instead of cache
       */
      redisClient.del("allTasks");
      res.json({ task });

      /** Caching Approach 2 (Commented below)- When any CUD operation takes place update the cache
       * accordingly with the updated data so that on next fetch data is returned from
       * cache itself rather querying from DB
       */
      // redisClient.get("allTasks", (err, reply) => {
      //   if (err) {
      //     redisClient.del("allTasks");
      //     next(err);
      //   } else if (reply) {
      //     tasks = JSON.parse(reply);
      //     let indx = tasks.findIndex(ele => {
      //       return ele._id.toString() === task._id.toString();
      //     });
      //     tasks.splice(indx, 1);
      //     redisClient.set("allTasks", JSON.stringify(tasks));
      //     res.json({ task });
      //   }
      // });
    })
    .catch(err => {
      redisClient.del("allTasks");
      next(err);
    });
}
