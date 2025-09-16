// import express from 'express';
// import User from '../models/User.js';
// import jwt from 'jsonwebtoken';
// const router = express.Router();

// // Signup
// router.post('/register', async (req, res) => {
//   const { username, email, password, confirmPassword, mobilenumber } = req.body;

//   if (!username || !email || !password || !confirmPassword || !mobilenumber) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }

//   try {
//     const userExists = await User.findOne({ $or: [{ email }, { mobilenumber }] });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({ username, email, password, mobilenumber });
//     res.status(201).json({ message: "User created successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { identifier, password } = req.body; // identifier = email or mobile
//   if (!identifier || !password) return res.status(400).json({ message: "All fields are required" });

//   try {
//     const user = await User.findOne({ $or: [{ email: identifier }, { mobilenumber: identifier }] });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;

import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();

// Signup route
router.post("/register", async (req, res) => {
  const { username, email, password, mobilenumber } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { mobilenumber }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ username, email, password, mobilenumber });

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body; // identifier = email or mobile

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { mobilenumber: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
