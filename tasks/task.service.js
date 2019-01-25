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

async function createTask(userParam) {
  if (await User.findOne({ _id: userParam.userAssigned })) {
    const task = new Task(userParam);
    return await task.save();
  } else {
    throw "User does not exist";
  }
}

async function updateTask(id, userParam) {
  return await Task.findOneAndUpdate(
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

async function deleteUserTask(id) {
  return await Task.findByIdAndRemove(id, function(err) {
    if (err) {
      return err;
    }
  });
}
