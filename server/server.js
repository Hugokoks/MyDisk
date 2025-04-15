import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

import CREATE_user from "./routes/CREATE_user.js";
import PATCH_userValidate from "./routes/PATCH_userValidate.js";
import POST_userLogin from "./routes/POST_userLogin.js";
import GET_userDiskData from "./routes/GET_userDiskData.js";
dotenv.config({ path: "./configServer.env" });

const app = express();

app.use(express.json());
app.use(cors());

///API's
app.use("/api/create", CREATE_user);
app.use("/api/patch", PATCH_userValidate);
app.use("/api/post", POST_userLogin);
app.use("/api/get", GET_userDiskData);


app.use(errorHandler);

const port = process.env.API_PORT;
////server start
app.listen(port, () => {
  console.log(`api server is running on port ${port}`);
});
