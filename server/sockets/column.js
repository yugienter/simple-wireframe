const { createColumn, deleteColumn, moveColumn } = require("../controllers/ws/column");

module.exports = (io, socket) => {

  socket.on("createNewColumn", async (data, call) => {
    const { roomId, token, payload } = data;

    console.log(data);

    const response = await createColumn({ boardId: roomId, ...payload });
    if (!response.error) {
      io.in(roomId).emit("createNewColumn", response.newColumn);
    }
    call(response);
  });

  socket.on("deleteColumn", async (data) => {
    const { roomId, token, payload } = data;

    const response = await deleteColumn({ boardId: roomId, ...payload });
    if (!response.error) {
      io.in(roomId).emit("deleteColumn", response);
    }
  });

  socket.on("moveColumn", async (data) => {
    const { roomId, token, payload } = data;

    const response = await moveColumn({ boardId: roomId, ...payload });
    if (!response.error) {
      socket.to(roomId).emit("moveColumn", response);
    }
  });
};
