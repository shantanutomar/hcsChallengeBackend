const config = require("config.json");
const db = require("_helpers/db");
const User = db.User;

module.exports = {
  getAllUserTasks,
  createUserTask,
  updateUserTask,
  delete: _deleteUserTask
};

async function createUserTask(userParam) {
  // validate
  if (await User.findOne({ _id: userParam.id })) {
  } else {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

// async function getAllUserTasks() {
//   return await User.find().select("-hash");
// }

// async function updateUserTask(id, userParam) {
//   const user = await User.findById(id);

//   // validate
//   if (!user) throw "User not found";
//   if (
//     user.username !== userParam.username &&
//     (await User.findOne({ username: userParam.username }))
//   ) {
//     throw 'Username "' + userParam.username + '" is already taken';
//   }

//   // hash password if it was entered
//   if (userParam.password) {
//     userParam.hash = bcrypt.hashSync(userParam.password, 10);
//   }

//   // copy userParam properties to user
//   Object.assign(user, userParam);

//   await user.save();
// }

// async function _deleteUserTask(id) {
//   await User.findByIdAndRemove(id);
// }
