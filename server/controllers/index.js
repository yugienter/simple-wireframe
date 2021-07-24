const user = require('./container/user.controller');
const board = require('./container/board.controller');
const column = require('./container/column.controller');
const task = require('./container/task.controller');

/**
 * Module exports
 */
module.exports = {
  user,
  board,
  column,
  task
}