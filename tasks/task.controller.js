const TaskModel = require("../models/task.model");
const logger = require("../logger/logger");

const CreateTask = async (req, res) => {
  try {
    const taskToCreate = req.body;

    const createdTask = TaskModel.create({
      title: taskToCreate.title,
      status: taskToCreate.status,
      user_id: taskToCreate.user_id,
    });

    if (!createdTask) {
      return res.status(500).json({
        message: "An error occured",
        data: null,
      });
    }

    res.status(201).json({});
  } catch (error) {}
};
