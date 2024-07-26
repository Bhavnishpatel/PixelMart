const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../helpers/AccessToken.js");
const { generateRefreshToken } = require("../helpers/refreshToken.js");

const signup = async (req, res) => {
  const { userName, email, password, accountType } = req.body;
  try {
    let user = await User.findOne({ userName });
    if (user)
      return res
        .status(400)
        .json({ success: false, Message: "UserName already In Use" });
    const securedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      userName,
      email,
      password: securedPassword,
      accountType,
    });
    return res
      .status(200)
      .json({ success: true, Message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, Message: "User not found" });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res
        .status(400)
        .json({ success: false, Message: "Invalid Password" });
    const data = {
      id: user._id,
      author: user.userName,
      accountType: user.accountType,
    };
    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);
    return res
      .status(200)
      .json({
        success: true,
        Message: "Login successfull",
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: user.accountType,
        author: user.userName,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { signup, login };
