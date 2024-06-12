import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import gameRoutes from "./routes/gameRoutes";

const app = express();

// Middleware
app.use(bodyParser.json());

app.use("/api/game", gameRoutes);

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
