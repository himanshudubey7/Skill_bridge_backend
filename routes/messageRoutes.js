const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const authMiddleware = require("../middleware/authMiddleware");

// Send a message
router.post("/", authMiddleware, async (req, res) => {
  const { recipient, text } = req.body;
  const sender = req.user.id;

  try {
    const newMsg = new Message({ sender, recipient, text });
    await newMsg.save();
    res.status(201).json({ message: "Message sent", data: newMsg });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Get all messages between logged-in user and someone else
router.get("/:userId", authMiddleware, async (req, res) => {
  const user1 = req.user.id;
  const user2 = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
