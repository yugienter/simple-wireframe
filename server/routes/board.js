const express = require("express");
const router = express.Router();
const passport = require("passport");
const controllers = require("../controllers");
const { board } = controllers;

const {
  createNewBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} = board;

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
  .get(authJWT, getBoards)
  .post(authJWT, createNewBoard);

router.route("/:boardId")
  .get(authJWT, getBoardById)
  .post(authJWT, updateBoard)
  .delete(authJWT, deleteBoard);

module.exports = router;
