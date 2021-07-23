const mongoose = require("../configs/mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username is not available"],
    minlength: [3, "must not be less that 3 charatcters"],
    maxlength: [20, "must not be longer than 20 characters"],
  },
  password: {
    type: String,
    minlength: [5, "must not be less that 5 charatcters"],
    required: [true, "password is required"],
  }
});

userSchema.plugin(uniqueValidator, { message: "{VALUE} is not available" });

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = (module.exports = mongoose.model("User", userSchema));
