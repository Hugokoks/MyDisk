import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

import POST_register from "./routes/POST_register.js";



dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", POST_register);


app.use(errorHandler);


const port = process.env.API_PORT;
////server start
app.listen(port, () => {
  console.log(`api server is running on port ${port}`);
});
