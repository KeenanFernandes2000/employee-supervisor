import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import empRoutes from "./routes/empRoutes.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use("/emp", empRoutes);

server.get("/", (req, res) => {
  console.log("App is live");
  return res.status(234).send("WELCOME TO THE COMPANY DASHBOARD");
});

server.get(
  "https://employee-supervisor.vercel.app/backend/check",
  (req, res) => {
    console.log("App is live");
    res.json({
      message: "Hello World",
    });
  }
);

mongoose
  .connect(process.env.DB_URL)
  .then(function () {
    console.log("DB is connected");
  })
  .catch(function (connectionError) {
    console.log("Connection error", connectionError);
  });

server.listen(process.env.PORT || 8000, function () {
  console.log("App is live");
});
