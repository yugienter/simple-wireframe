const authRoutes = require("./auth");

const passport = require("passport");

module.exports = (app) => {
  require("../configs/passport-jwt")(passport);
  app
    .use("/api", authRoutes)

  app.use((req, res) => {
    res.status(404).json({
      error: true,
      message: `Bad request - route does not exist: ${req.method} ${req.originalUrl}`,
    });
  });
};
