const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./models/userModel');
const Message = require('./models/messageModel');
require("dotenv").config();

const app = express();

// ✅ Proper CORS config for both Vercel + Localhost
app.use(cors({
  origin: [
    "https://socialconnect-frontend.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
