import bcypt from "bcrypt";
import { nanoid } from "nanoid";
import { getPool, tables } from "./sqlConfig.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/emailSender.js";

async function userCreate({ username, password, email }) {
  const pool = await getPool();

  ////creating unique id for user
  const userId = nanoid();

  ////hashing password
  const saltRounds = 16;
  const hashedPassword = await bcypt.hash(password, saltRounds);

  ////SQL check username and email REQUEST
  let check = await pool
    .request()
    .input("username", username)
    .input("email", email)
    .query(
      `SELECT * FROM ${tables.USERS} WHERE username = @username or email = @email`
    );

  ////if record exists
  if (check.recordset.length !== 0) {
    ////loop through users
    check.recordset.forEach((row) => {
      if (row.username === username)
        throw new AppError("username already exists", 409);
      if (row.email === email) throw new AppError("email already exists", 409);
    });
  }

  ////SQL CREATE request
  await pool
    .request()
    .input("id", userId)
    .input("username", username)
    .input("email", email)
    .input("password", hashedPassword)
    .input("verified", "N")
    .query(
      `INSERT INTO ${tables.USERS} (id,username,email,password,verified) VALUES (@id,@username,@email,@password,@verified)`
    );

  ////SQL CREATE request token validation

  const token = generateToken();

  sendEmail(email, token);

  await pool
    .request()
    .input("id", userId)
    .input("email", email)
    .input("token", token)
    .query(
      `INSERT INTO ${tables.VALIDATION} (id,email,token) VALUES (@id,@email,@token)`
    );
}

export default userCreate;
