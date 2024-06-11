// Express app setup and middleware configuration

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(bodyParser.json());


// Connect to MongoDB
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/memory-game";
mongoose.connect(mongoUri).then(
  () => {
    console.log("Connected to MongoDB");
  },
  (err) => {
    console.log("Error connecting to MongoDB:", err);
  }
);

export default app;
