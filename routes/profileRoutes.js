const express = require("express");
const { getProfile, updateProfile, deleteProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", authMiddleware, getProfile);
router.put("/:id", authMiddleware, updateProfile);
router.delete('/:id', authMiddleware, deleteProfile);


module.exports = router;
