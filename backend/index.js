import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import empRoutes from "./routes/empRoutes.js";

dotenv.config();

const server = express();
server.use(
  cors({
    origin: ["https://employee-supervisor-frontend.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
server.use(express.json());
server.use("/emp", empRoutes);

server.get("/", (req, res) => {
  console.log("App is live");
  return res.status(234).send("WELCOME TO THE COMPANY DASHBOARD");
});

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
