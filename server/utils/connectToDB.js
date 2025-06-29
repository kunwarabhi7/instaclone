import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

export const connectToDB = async () => {
  try {
    // if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Already Connected");
      return;
    }

    const dbUri = process.env.MONGODB_URI;
    mongoose.connect(dbUri);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};
