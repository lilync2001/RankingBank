import express from "express";
import cors from "cors";
//import indexRoutes from "./routes/index.routes.js";
import morgan from "morgan";

const app = express();
app.use(express.json());

const whiteList = [
  "http://localhost:4200",
  "https://localhost:4200",
];

app.use(
  cors({
    credentials: true,
    origin: whiteList,

    credentials: true,
  })
);
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

//app.use(indexRoutes);

export default app;