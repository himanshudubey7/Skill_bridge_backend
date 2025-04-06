const express = require("express");
const router = express.Router();
const SkillPost = require("../models/skillPost");
const authMiddleware = require("../middleware/authMiddleware");

// @route   POST /api/posts
// @desc    Create a new skill or requirement post
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, type, description, tags } = req.body;

    // Validation
    if (!title || !type) {
      return res.status(400).json({ message: "Title and type are required." });
    }

    if (!["offer", "request"].includes(type)) {
      return res.status(400).json({ message: "Type must be either 'offer' or 'request'." });
    }

    const newPost = new SkillPost({
      user: req.user.id, // From auth middleware
      title,
      type,
      description,
      tags
    });

    const savedPost = await newPost.save();
    res.status(201).json({ message: "Post created", post: savedPost });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/posts
// @desc    Get all skill and requirement posts
// @access  Public
router.get("/", async (req, res) => {
    try {
        const { type, tag, userId } = req.query;

    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (tag) {
      filter.tags = tag;
    }

    if (userId) {
      filter.user = userId;
    }
      const posts = await SkillPost.find(filter)
        .populate("user", "name email") // optional: include user info
        .sort({ createdAt: -1 }); // latest first
  
      res.status(200).json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
