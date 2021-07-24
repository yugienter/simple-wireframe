const Board = require("../../models/board");
const User = require("../../models/user");
const Task = require("../../models/task");

const boardService = {};

boardService.getBoards = async (req, res) => {
  const { id } = req.user;
  try {
    const boards = await Board.find({}, "description name _id author")
      .sort({ timeCreated: -1 });

    console.log('boards', boards);
    return res.json({ boards });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

boardService.createNewBoard = async (req, res) => {
  const { id: authorId } = req.user;
  const { name, description } = req.body;
  const newBoard = new Board({ name, description, author: authorId });
  try {
    await newBoard.save();
    return res.json({
      message: "new board successfuly created",
      board: newBoard,
    });
  } catch (error) {
    next(error);
  }
};

boardService.updateBoard = async (req, res) => {
  const { name, description } = req.body;
  const { boardId } = req.params;
  try {
    await Board.findOneAndUpdate({ _id: boardId }, { name, description });
    return res.json({
      boardId,
      message: "board successfuly updated",
    });
  } catch (error) {
    next(error);
  }
};

boardService.getBoardById = async (req, res) => {
  const { boardId } = req.params;
  const { short } = req.query;
  try {
    if (short === "true") {
      const foundBoard = await Board.findOne({ _id: boardId }, "_id name description author");
      return res.status(200).json(foundBoard);
    }
    foundBoard = await Board.findOne(
      { _id: boardId },
      "_id name description author columns"
    ).populate({
      path: "columns",
      populate: {
        path: "tasks",
      },
    });
    return res.status(200).json(foundBoard);
  } catch (error) {
    next(error);
  }
};

boardService.deleteBoard = async (req, res) => {
  const { id } = req.user;
  const { boardId } = req.params;

  try {
    const { author } = await Board.findById(boardId);
    if (author.toLocaleString() !== id.toLocaleString()) {
      return res.status(401).json({ message: "you are not the author of this Board" });
    }
    // delete tasks
    await Task.deleteMany({ board: boardId });
    // delete board
    await Board.findByIdAndDelete(boardId);

    return res.status(200).json({ message: `successfully deleted board with id: ${boardId}` });
  } catch (error) {
    next(error);
  }
};

module.exports = boardService;
