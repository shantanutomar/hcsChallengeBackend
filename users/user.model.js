const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userAge: { type: Number, required: true },
  userDetails: { type: String, required: true },
  userCreatedOn: { type: Date, default: Date.now }
});

userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
