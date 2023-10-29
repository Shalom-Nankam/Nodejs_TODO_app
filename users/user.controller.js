const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require("../logger/logger");

const CreateUser = async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await UserModel.findOne({ email: user.email });

    if (existingUser) {
      res.status(409).json({
        message: "User already exists.",
        data: null,
      });
      return;
    }
    const createdUser = await UserModel.create({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
    });

    const token = jwt.sign(
      { email: createdUser.email, first_name: createdUser.first_name },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      message: "User created successfully",
      data: createdUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

const Login = async (req, res) => {
  logger.info("===========> Logging user in");
  try {
    const user = req.body;

    const existingUser = await UserModel.findOne({ email: user.email });

    if (!existingUser) {
      res.status(401).json({
        message: "User not found",
        data: null,
      });
    }
    const validPass = await existingUser.isValidPassword(user.password);
    if (!validPass) {
      res.status(422).json({
        message: "Incorrect password.",
        data: null,
      });
    }
    const token = await jwt.sign(
      { email: user.email, first_name: existingUser.first_name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    logger.info("===========> user logged in successfully");
    res.status(200).json({
      message: "Logged in successfully",
      user: existingUser,
      token,
    });
  } catch (error) {
    logger.error("============> error logging user in: " + error.message);
    res.status(500).json({
      message: "Internal server error",
      data: null,
    });
  }
};

module.exports = {
  CreateUser,
  Login,
};
