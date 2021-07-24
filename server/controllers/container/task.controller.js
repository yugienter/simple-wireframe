const Task = require("../../models/task");

const taskService = {};

taskService.getTaskbyId = async (req, res) => {
  const { taskId } = req.params;
  try {
    const foundTask = await Task.findOne({ _id: taskId }).populate({
      path: "author",
      select: "_id username",
    });
    return res.status(200).json({ task: foundTask });
  } catch (error) {
    next(error);
  }
};

taskService.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description } = req.body;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { title, description },
      { new: true, useFindAndModify: false }
    );
    const task = await updatedTask
      .populate("author", "username")
      .execPopulate();
    return res.status(200).json({ message: "task updated", task: task });
  } catch (error) {
    next(error);
  }
};

module.exports = taskService;
