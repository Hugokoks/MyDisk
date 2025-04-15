import { getPool, tables } from "./sqlConfig.js";
import AppError from "./../utils/appError.js";
import bcrypt from "bcrypt";
import createJWT from "./../utils/createJWT.js";


async function userLogin(username, password) {

    const pool = await getPool();


    let user = await pool.request()
        .input('username', username)
        .query(`SELECT * FROM ${tables.USERS} WHERE username = @username or email = @username`);

    if (user.recordset.length === 0) throw new AppError("wrong username or password", 401);

    user = user.recordset[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError("wrong username or password", 401);

    return createJWT(user.id);

}

export default userLogin;