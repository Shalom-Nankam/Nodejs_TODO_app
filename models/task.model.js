const mongoose = require("mongoose");
const shortId = require("shortid");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortId.generate,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
