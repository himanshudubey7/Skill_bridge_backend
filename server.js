// server.js

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken"); 
const cors = require("cors");

const User = require("./models/user");
const Chat = require("./models/message");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillPostRoutes = require("./routes/skillPost");
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());





const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ========== ROUTES ==========
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", skillPostRoutes);


app.use('/api/messages', messageRoutes);
// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
