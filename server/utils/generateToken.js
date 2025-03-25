import crypto from "crypto";
function generateToken() {
    // Generate 32 random bytes and convert them to a hexadecimal string
    const token = crypto.randomBytes(32).toString('hex');
    return token;

}


export default generateToken;