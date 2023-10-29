const TaskModel = require("../models/task.model");
const logger = require("../logger/logger");

const CreateTask = async (task) => {
  logger.info("===============> creating new task");
  try {
    const taskToCreate = task;

    const createdTask = await TaskModel.create({
      title: taskToCreate.title,
      status: taskToCreate.status,
      user_id: taskToCreate.user_id,
    });

    if (!createdTask) {
      return {
        message: "An error occured",
        data: null,
        code: 500,
      };
    }

    logger.info("===============> succesfully created task");
    return {
      message: "Task created successfully",
      code: 201,
      task: createdTask,
    };
  } catch (error) {
    logger.error(
      "==================> error with creating task" + error.message
    );
    return {
      message: "An error occured",
      code: 500,
      data: null,
    };
  }
};

const GetAllTasks = async (id) => {
  logger.info("===============> getting all tasks for user: " + id);

  try {
    const tasks = await TaskModel.find({ user_id: id });

    logger.info("===============> succesfully fetched tasks");

    return {
      message: "Tasks fetched successfully",
      code: 200,
      data: tasks,
    };
  } catch (error) {
    logger.error(
      "==================> error with getting tasks " + error.message
    );
    return {
      message: "An error occured",
      code: 500,
      data: null,
    };
  }
};

const ChangeStatus = async (id) => {
  logger.info("===============> updating new task: " + id);

  // const taskToUpdate = id;

  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: "Completed" } }
    );

    if (!updatedTask) {
      logger.info("===============> task not updated");

      return {
        message: "An error occured",
        data: null,
        code: 500,
      };
    }

    logger.info("===============> succesfully updated task");

    return {
      message: "Task successfully updated",
      code: 201,
      data: updatedTask,
    };
  } catch (error) {
    logger.error(
      "==================> error with updating task" + error.message
    );
    return {
      message: "An error occured",
      code: 500,
      data: null,
    };
  }
};

const DeleteTask = async (id) => {
  logger.info("===============> deleting task :" + id);

  const taskToDelete = id;

  try {
    const deletedTask = await TaskModel.findOneAndDelete({
      _id: taskToDelete,
    });

    if (!deletedTask) {
      return {
        message: "An error occured",
        data: null,
        code: 500,
      };
    }

    logger.info("===============> succesfully deleted task");

    return {
      message: "Task successfully deleted",
      code: 201,
      data: deletedTask,
    };
  } catch (error) {
    logger.error(
      "==================> error with deleting task" + error.message
    );
    return {
      message: "An error occured",
      code: 500,
      data: null,
    };
  }
};

const FilterTasks = async (status) => {
  logger.info("================> filtering tasks by: " + status);
  try {
    const tasks = await TaskModel.find({ status: status });

    if (!tasks) {
      logger.error("================> no tasks found!");
      return {
        code: 404,
        message: "No tasks found!",
        data: null,
      };
    }
    logger.info("======================> tasks filtered successfully");
    return {
      message: "Tasks retrieved successfully",
      data: tasks,
      code: 200,
    };
  } catch (error) {
    logger.error(
      "================> error with filtering tasks: " + error.message
    );
    return {
      code: 500,
      message: "Error occured",
      data: null,
    };
  }
};

module.exports = {
  CreateTask,
  GetAllTasks,
  ChangeStatus,
  DeleteTask,
  FilterTasks,
};
