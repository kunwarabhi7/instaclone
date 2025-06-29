import express from "express";
import { configDotenv } from "dotenv";
import { connectToDB } from "./utils/connectToDB.js";
import { userRouter } from "./routes/user.route.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Route is running" });
});
app.use(express.json());

app.use("/api/user", userRouter);

app.listen(PORT, (req, res) => {
  connectToDB();
  console.log("server is running on", +PORT);
});
