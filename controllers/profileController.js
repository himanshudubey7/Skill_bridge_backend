const User = require("../models/user");

// GET /api/profile/:id -- find user
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/profile/:id -- update
const updateProfile = async (req, res) => {
  // console.log(req);
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, skills, bio, location, profilePicture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, skills, bio, location, profilePicture },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//delete profile
const deleteProfile = async (req, res) => {
    try {
      if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = { getProfile, updateProfile, deleteProfile };
