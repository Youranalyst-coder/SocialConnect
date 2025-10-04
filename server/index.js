const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
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

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
connectDB();

// ✅ Import routes
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.send("SocialConnect Backend is running 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

// ✅ Setup Socket.io
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["https://socialconnect-frontend.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});
