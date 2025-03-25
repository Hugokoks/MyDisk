import sql from "mssql";
import { getPool, tables } from "./sqlConfig.js";
import AppError from "./../utils/appError.js";


async function userValidate(token) {
    const pool = await getPool();


    /////getting user data
    let user = await pool.request()
        .input("token", token)
        .query(`SELECT * FROM ${tables.VALIDATION} WHERE token = @token`);

    if (user.recordset.length === 0) throw new AppError("rejected", 401);

    user = user.recordset[0];

    ////update user validation to Y
    await pool.request()
        .input("id", user.id)
        .query(`UPDATE ${tables.USERS} SET verified = 'Y' WHERE id = @id`);


    ///delete pedning validation 
    await pool.request()
        .input("id", user.id)
        .query(`DELETE FROM ${tables.VALIDATION} WHERE id = @id`)


}

export default userValidate;