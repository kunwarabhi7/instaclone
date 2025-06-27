import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Route is running" });
});

app.listen(5000, (req, res) => {
  console.log("server is running on", +5000);
});
