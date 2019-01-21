/*
User service for user handling rests calls
*/
const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;
const Task = db.Task;

module.exports = {
  authenticateUser,
  createUser,
  getAllUserTasks,
  getUserById
};

async function authenticateUser({ userName, password }) {
  const user = await User.findOne({ userName });
  if (user && bcrypt.compareSync(password, user.hashPassword)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function createUser(userParam) {
  if (await User.findOne({ username: userParam.userName })) {
    throw 'Username "' + userParam.userName + '" is already taken';
  }
  const user = new User(userParam);

  if (userParam.password) {
    user.hashPassword = bcrypt.hashSync(userParam.password, 10);
  }
  await user.save();
  return {
    ...user
  };
}

async function getAllUserTasks(userParam) {
  console.log(userParam);
  return await Task.find({ userAssigned: userParam.userId });
}
async function getUserById(id) {
  return await User.findById(id);
}
