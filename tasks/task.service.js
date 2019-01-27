/*
User service for task handling rests calls
*/

const db = require("_helpers/db");
const Task = db.Task;
const User = db.User;

module.exports = {
  createTask,
  updateTask,
  deleteUserTask
};

function createTask(userParam) {
  if (User.findOne({ _id: userParam.userAssigned })) {
    const task = new Task(userParam);
    return task.save();
  } else {
    throw "User does not exist";
  }
}

function updateTask(id, userParam) {
  return Task.findOneAndUpdate(
    { _id: id },
    userParam,
    {
      new: true,
      overwrite: true
    },
    function(err) {
      if (err) return err;
    }
  );
}

function deleteUserTask(id) {
  return Task.findByIdAndRemove(id);
}
