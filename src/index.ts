import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import router from "./router";
import dontenv from "dotenv";

dontenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.error(error));

app.use("/", router());
