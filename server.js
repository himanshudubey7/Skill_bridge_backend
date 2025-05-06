
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const { Server } = require("socket.io");
const jwt = require("jsonwebtoken"); 
const cors = require("cors");

const User = require("./models/user");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillPostRoutes = require("./routes/skillPost");

const {Server} = require("socket.io");
const socketHandler = require("./socket");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:"*",
    methods: ["GET", "POST"]
  }
});
socketHandler(io);




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
app.get('/api/messages/:userId',authMiddleware,async(req,res)=>{
  const messages = await Message.find({
    $or:[
      {from: req.user.id, to: req.params.userId},
      {from: req.params.userId, to:req.user.id}
    ]
  }).sort({timestamp:1});
  res.json(messages);
})

// app.use('/api/messages', messageRoutes);
// ========== START SERVER ==========
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
