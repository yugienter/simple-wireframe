require('dotenv').config();
process.env.NODE_PATH = './';
require('module').Module._initPaths();
const ENV_CONF = require("./configs/env.conf");
const express = require("express")
const http = require("http");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const cors = require("cors");

const env = ENV_CONF.NODE_ENV || 'development';

/**
 * Watch env
 */
console.log('*** Environment:', env);

const app = express();
const server = http.createServer(app);
const routeErrorHandler = require("./error/errorHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ credentials: true, origin: ENV_CONF.CORS_ORIGIN }));

if (env === "development") {
  app.use(logger("dev"));
  app.use(errorHandler());
}
if (env === "production") {
  app.use(logger("prod"));
  app.use(errorHandler());
} else {
  app.use(logger("short"));
}

/**
 * Creating socket server
 */
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: ENV_CONF.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

require("./routes/")(app);

app.use(routeErrorHandler);

require("./sockets")(io);

server.listen(ENV_CONF.PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  var bind = typeof ENV_CONF.PORT === 'string' ? 'Pipe ' + ENV_CONF.PORT : 'Port ' + ENV_CONF.PORT;
  switch (error.code) {
    case 'EACCES':
      console.log(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('*** Listening on ' + bind);
}