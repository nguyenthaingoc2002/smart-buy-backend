import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import appRoute from "./routes/router.js";
import cors from "cors"
import mongoose from "mongoose";
dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({extended: true }));
app.use("/api", appRoute);

const PORT = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
