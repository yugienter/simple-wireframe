const Board = require("../../models/board");

const columnService = {};

columnService.getBoardColumns = async (req, res) => {
  const { boardId } = req.params;
  try {
    const { columns } = await Board.findOne({ _id: boardId }, "columns").populate({
      path: "columns",
      populate: {
        path: "tasks",
      },
    });
    return res.status(200).json({ columns });
  } catch (error) {
    next(error);
  }
};

columnService.editColumnName = async (req, res) => {
  const { boardId, columnId } = req.params;
  const { name } = req.body;
  try {
    await Board.findOneAndUpdate(
      { _id: boardId, "columns._id": columnId },
      { $set: { "columns.$.name": name } }
    );
    return res.status(200).json({ message: "updated column name" });
  } catch (error) {
    next(error);
  }
};

module.exports = columnService;
