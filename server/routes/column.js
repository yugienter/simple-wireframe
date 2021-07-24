const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const controllers = require("../controllers");
const { column } = controllers;

const { getBoardColumns, editColumnName } = column;

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
  .get(authJWT, getBoardColumns)

router.route("/:columnId")
  .patch(authJWT, editColumnName)


module.exports = router;
