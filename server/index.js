import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Connected to Database on Port: ${process.env.PORT}`))
  .catch(() => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Backend Server Running: ${process.env.MONGO_URL}`);
});
