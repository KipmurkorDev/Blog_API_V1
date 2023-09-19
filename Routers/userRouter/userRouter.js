const express = require("express");
const {
  userSignup,
  userLogin,
} = require("../../Controllers/userController/userController");

const userRouter = express.Router();

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);

module.exports = userRouter;
