const authRoutes = require("./auth");
const userRoutes = require("./user");
const boardRoutes = require("./board");
const taskRoutes = require("./task");
const columnRoutes = require("./column");

const passport = require("passport");

module.exports = (app) => {
  require("../configs/passport-jwt")(passport);
  app
    .use("/api", authRoutes)
    .use("/api/user", userRoutes)
    .use("/api/board", boardRoutes)
    .use("/api/board/:boardId/column", columnRoutes)
    .use("/api/board/:boardId/task", taskRoutes);

  app.use((req, res) => {
    res.status(404).json({
      error: true,
      message: `Bad request - route does not exist: ${req.method} ${req.originalUrl}`,
    });
  });
};
