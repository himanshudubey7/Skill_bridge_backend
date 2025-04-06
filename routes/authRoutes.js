const express = require("express");
const { register, login, logout} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to your profile", userId: req.user.userId });
  });

router.post("/logout", (req, res) => {
    // On frontend: just delete token
    // Here, we send a response for confirmation
    res.status(200).json({ message: "Logged out successfully" });
  });


module.exports = router;
