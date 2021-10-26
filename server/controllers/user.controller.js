const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../.config");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      expenses: user.expenses,
    },
    "8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb",
    { expiresIn: "1h" }
  );
}

const userCtrl = {};

userCtrl.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });

  resUser = await newUser.save();
  const token = generateToken(resUser);
  res.json({
    user: {
      _id: resUser._id,
      username: resUser.username,
      createdAt: resUser.createdAt,
      expenses: resUser.expenses,
      budget: resUser.budget,
    },
    token: token,
  });
};

userCtrl.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.send("user not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    // errors.general = "Wrong crendetials";
    // throw new UserInputError("Wrong crendetials", { errors });
    res.send("user or password incorrect");
  }
  const token = generateToken(user);
  res.json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      budget: user.budget,
    },
    token: token,
  });
};

module.exports = userCtrl;
