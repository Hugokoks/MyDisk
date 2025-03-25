
import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/appError.js";
import userLogin from "../SQL/userLogin.js";


const router = express.Router();



router.post('/user_login', asyncHandler(async (req, res) => {

    const { username, password } = req.body;

    const token = await userLogin(username, password);

    res.status(200).json({ status: 'ok', message: "user login", token });




}));

export default router;