const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require("../_helpers/db");
const User = db.User;

const taskSchema = new Schema({
  userAssigned: { type: Schema.Types.ObjectId, ref: User },
  taskDesc: { type: String, required: true },
  taskCreatedOn: { type: Date, default: Date.now },
  taskDueDate: { type: Date, required: true }
});

taskSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Task", taskSchema);
