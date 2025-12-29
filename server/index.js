// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import authRoutes from './routes/auth.js';

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 8000;

// // CORS
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api/users", authRoutes);

// // MongoDB connection and server start
// const start = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("✅ MongoDB connected");
//     app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
//   } catch (err) {
//     console.error("❌ DB connection error:", err);
//     process.exit(1);
//   }
// };

// start();



import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

// Routes
app.use("/api/users", authRoutes);

// Start server
const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(port, () =>
      console.log(`🚀 Server running on port ${port}`)
    );
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

start();
