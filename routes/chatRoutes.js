const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Chat = require("../models/message");

router.post("/start", auth, async (req, res) => {
    const userId = req.user.id;
    const { otherUserId } = req.body;
  
    try {
      // Check if chat already exists
      let chat = await Chat.findOne({
        participants: { $all: [userId, otherUserId] },
      });
  
      if (!chat) {
        // If not found, create new chat
        chat = new Chat({ participants: [userId, otherUserId] });
        await chat.save();
      }
  
      res.status(200).json(chat);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to start chat" });
    }
  });
  
