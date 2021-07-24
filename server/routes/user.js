const express = require("express");
const router = express.Router();
const passport = require("passport");
const { user } = controllers;
const { changePassword } = user;

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/change_password").patch(authJWT, changePassword);

module.exports = router;
