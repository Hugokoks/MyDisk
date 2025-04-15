import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../utils/appError.js";

dotenv.config({ path: "configServer.env" });

const JWTKey = process.env.JWT_KEY;

function validateJwt(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        throw new AppError("rejected", 409)
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWTKey, (err, decoded) => {
        if (err) {

            throw new AppError("rejected", 409)

        }

        req.tokenData = decoded;
        next();

    });

}


export default validateJwt;

