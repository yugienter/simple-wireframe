const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Board = require("../../models/board");
const Task = require("../../models/task");
const { ObjectId } = require("mongodb");
const board = require("../../models/board");
const SECRET_KEY = process.env.SECRET_KEY || "veri $ecret K#y";

async function getHeadersConfig({ username = 'admin123', password = 'admin123@' }) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, password: hashedPassword });
  const adminUser = await newUser.save();
  const token = jwt.sign({ id: adminUser._id }, SECRET_KEY, { expiresIn: 604800 });
  return { token: `Bearer ${token}`, username, userId: adminUser._id, password };
}

async function createSimpleBoard({
  name = 'NewBoard',
  description = 'newDescription',
  userId,
  columnId,
  columnName = 'column1',
}) {
  if (!userId) {
    userId = (await getHeadersConfig({})).userId;
  }
  if (!columnId) {
    columnId = ObjectId();
  }
  const newBoard = await Board.create({
    name,
    description,
    author: userId,
    columns: [{ _id: columnId, name: columnName, task: [] }],
  })
  return await newBoard.save();
}

async function createBoardWithTaskInColumn({
  name = 'NewBoard',
  description = 'newDescription',
  userId,
  columnId,
  columnName,
  taskTitle = 'NewTask',
  taskDes = 'TastDescription',
  taskId,
}) {
  if (!userId) {
    userId = (await getHeadersConfig({})).userId;
  }
  const newBoard = await createSimpleBoard(
    { name, description, userId, columnId, columnName }
  );
  if (!taskId) {
    const newTask = new Task({
      title: 'NewTask',
      description: 'TestTask',
      author: newBoard.author,
      board: newBoard._id
    });
    const savedTask = await newTask.save();
    taskId = savedTask._id;
  }
  newBoard.columns[0].tasks.push(taskId);
  return await newBoard.save();
}


async function createNewTask({
  name = 'New Task',
  description = 'newDescription',
  userId,
  columnId,
  boardId,
}) {
  if (!userId) {
    userId = (await getHeadersConfig({})).userId;
  }
  let newBoard;
  if (!boardId) {
    newBoard = await createSimpleBoard(
      { userId, columnId }
    );
    boardId = newBoard._id;
  } else {
    newBoard = await Board.findById(boardId);
    if (!columnId) columnId = newBoard.columns[0]._id;
  }

  const newTask = new Task({
    title: name,
    description,
    author: userId,
    board: boardId
  });

  const savedTask = await newTask.save();

  taskId = savedTask._id;
  newBoard.columns[0].tasks.push(taskId);

  return { taskId, boardId, columnId }
}

module.exports = {
  getHeadersConfig,
  createSimpleBoard,
  createBoardWithTaskInColumn,
  createNewTask,
};