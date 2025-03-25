import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: 'configServer.env' });


const JWTKey = process.env.JWT_KEY;


function createJWT(id) {

    const payload = {
        id: id,
        role: "user",
    };

    const options = {
        expiresIn: "2h",
        issuer: "myDisk"
    }

    const token = jwt.sign(payload, JWTKey, options);

    return token;

}

export default createJWT;