import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import userValidate from "../SQL/userValidate.js";
const router = express.Router();


router.patch("/user_validate", asyncHandler(async (req, res) => {
    const { token } = req.body;
    await userValidate(token);

    res.status(201).json({ status: "ok", message: "user registered" });

}));

export default router;