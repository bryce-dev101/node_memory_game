import express from "express";
import mongoose from "mongoose";
import gameRoutes from "./routes/gameRoutes";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express(); // Ensure this line is present

// Use express built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use game routes
app.use("/api/games", gameRoutes);

const mongoUri: string =
  process.env.MONGO_URI || "mongodb://localhost:27017/memory-game";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

export default app;
