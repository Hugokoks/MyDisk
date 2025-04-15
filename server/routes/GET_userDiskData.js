import express from "express";
import asyncHandler from "./../middlewares/asyncHandler.js";
import validateJwt from "./../middlewares/validateJwt.js";


const router = express.Router();



router.get("/user_disk_data", validateJwt, asyncHandler(async (req, res) => {

    const { id } = req.tokenData;
    console.log(id);

}))


export default router;




