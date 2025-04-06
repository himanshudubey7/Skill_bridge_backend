const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register route

const register = async (req, res) => {
  try {
    const { name, email, password, skills,bio } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword , skills:skills||[], bio:bio});
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user:{
      id: newUser._id,
      name: newUser.name,
      email:newUser.email,
      skills:newUser.skills,
      bio: newUser.bio
    } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//login route

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { register, login };
