/*
User service for user handling rests calls
*/
const config = require("../config.json");
const fs = require("fs");
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
  const privateKEY = fs.readFileSync("_helpers/private.key", "utf8");
  const user = await User.findOne({ userName });
  if (user && bcrypt.compareSync(password, user.hashPassword)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user._id }, privateKEY, {
      expiresIn: config.jwtTokenValidity,
      algorithm: "RS256"
    });
    return {
      ...userWithoutHash,
      token
    };
  } else {
    throw "Username or Password is incorrect";
  }
}

async function createUser(userParam) {
  if (await User.findOne({ userName: userParam.userName })) {
    throw "User Name " + userParam.userName + " is already taken";
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
  return await Task.find({ userAssigned: userParam.userId })
    .lean()
    .sort({ taskDueDate: "asc" });
}
async function getUserById(id) {
  return await User.findById(id);
}
