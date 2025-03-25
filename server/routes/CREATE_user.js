import express from "express";
import userCreate from "../SQL/userCreate.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validator from "validator";
import AppError from "../utils/appError.js";

const router = express.Router();

router.post("/user", asyncHandler(async (req, res) => {
  const { username, email, password, passwordCheck } = req.body;

  handleClientErrors(username, email, password, passwordCheck);

  await userCreate({ username, email, password });

  res.status(201).json({ status: "ok", message: "user registered" });

}));




function handleClientErrors(username, email, password, passwordCheck) {

  ////empty inputs checking
  if (!username || !email || !password || !passwordCheck) {
    throw new AppError("please fill inputs", 422);

  }

  ///password checking
  if (password !== passwordCheck) {
    throw new AppError("Passwords do not match", 422);


  }
  if (!validator.isEmail(email)) {
    throw new AppError("please enter valid email", 422);

  }

}

export default router;
