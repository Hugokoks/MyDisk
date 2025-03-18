import dotenv from "dotenv";
import sql from "mssql";

dotenv.config({ path: "config.env" });


const sqlPort = process.env.SQL_PORT;
const sqlServer = process.env.SQL_SERVER;
const sqlUser = process.env.SQL_USER;
const sqlPassword = process.env.SQL_PASSWORD;
const sqlDatabase = process.env.SQL_DATABASE;




const configSQL = {
    user: sqlUser,
    password: sqlPassword,
    server: sqlServer,
    port: Number(sqlPort),
    database: sqlDatabase,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
};

let pool;

async function getPool() {

    if (pool) {
        return pool;
    }
    try {
        pool = await sql.connect(configSQL);
        return pool;
    }
    catch (err) {
        throw new Error(err);
    }

}

const tables = {
    USERS: process.env.TABLE_USERS,
    VALIDATION: process.env.TABLE_VALIDATION
}


export { getPool, tables };