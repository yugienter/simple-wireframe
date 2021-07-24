const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const controllers = require("../controllers");
const { task } = controllers;

const { getTaskbyId, updateTask } = task;

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/:taskId")
  .get(authJWT, getTaskbyId)
  .post(authJWT, updateTask)


module.exports = router;
