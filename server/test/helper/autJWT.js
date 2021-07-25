const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "veri $ecret K#y";

async function getHeadersConfig({ username = 'admin123', password = 'admin123@' }) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, password: hashedPassword });
  const adminUser = await newUser.save();
  const token = jwt.sign({ id: adminUser._id }, SECRET_KEY, { expiresIn: 604800 });
  return { token: `Bearer ${token}`, username };
}

module.exports = { getHeadersConfig };