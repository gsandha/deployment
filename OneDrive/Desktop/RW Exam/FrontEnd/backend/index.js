import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import cookieParser  from "cookie-parser";
dotenv.config();

import cors from "cors";
import { connection } from "./config/db.js";


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.status(200).send("Welcome to Home");
  } catch (error) {
    res.status(404).send({ mgs: error.message });
  }
});

app.listen(process.env.PORT_LINK, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running at port ${process.env.PORT_LINK}`);
});
