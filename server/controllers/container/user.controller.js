const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ENV_CONF = require("../../configs/env.conf");
const { AuthError, ResponseError } = require("../../error/");
const requiredValues = require("../../helper/requiredValues");

const userService = {};

userService.registerUser = async (req, res, next) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  try {
    requiredValues(["password"], req.body);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "sucessfully registered" });
  } catch (error) {
    next(error);
  }
};

userService.loginJWT = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    requiredValues(["username", "password"], req.body);
    let foundUser = await User.findOne(
      { username: username },
      "_id username password"
    );
    if (foundUser === null) {
      throw new ResponseError(
        { username: "user with such username does not exist" },
        404
      );
    }
    const { _id, password: userPassword } = foundUser;
    foundUser = { _id, username };

    const isPasswordMatch = await bcrypt.compare(password, userPassword);
    if (!isPasswordMatch) throw AuthError.badLogin();

    const token = jwt.sign({ id: _id }, ENV_CONF.SECRET_KEY, { expiresIn: 604800 });
    return res.status(200).json({
      token: `Bearer ${token}`,
      user: foundUser,
    });
  } catch (error) {
    next(error);
  }
};

userService.isAuthenticated = async (req, res, next) => {
  const { id } = req.user;
  try {
    const foundUser = await User.findOne(
      { _id: id },
      "_id username"
    );
    if (foundUser === null) {
      throw new ResponseError("user with such id does not exist", 404);
    }
    return res.status(200).json({
      authorized: true,
      user: foundUser,
    });
  } catch (error) {
    next(error);
  }
};

userService.changePassword = async function (req, res, next) {
  const { id } = req.user;
  const { newPassword, matchPassword } = req.body;

  try {
    requiredValues(["newPassword", "matchPassword"], req.body);
    const foundUser = await User.findById(id);
    if (newPassword !== matchPassword) {
      const message = { matchPassword: "does not match password" };
      throw new ResponseError(message, 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    foundUser.password = hashedPassword;
    foundUser.save();
    return res.status(200).json({ message: "password successfully changed" });
  } catch (error) {
    next(error);
  }
};

module.exports = userService;
