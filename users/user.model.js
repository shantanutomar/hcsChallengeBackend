/*
Modal for user handling
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  hashPassword: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userAge: { type: Number, required: true },
  userDetails: { type: String, required: true },
  userCreatedOn: { type: Date, default: Date.now }
});

userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
