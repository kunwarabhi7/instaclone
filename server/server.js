import express from "express";
import { configDotenv } from "dotenv";
import { connectToDB } from "./utils/connectToDB.js";
import { userRouter } from "./routes/user.route.js";
import { PostRouter } from "./routes/post.route.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Route is running" });
});
app.use("/api/user", userRouter);
app.use("/api/post", PostRouter);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start Server
const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1); // Exit if DB connection fails
  }
};

startServer();
