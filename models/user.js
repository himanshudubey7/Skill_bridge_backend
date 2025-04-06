const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: {type: [String], default:[]},
    bio: { type: String },
    location: { type: String },
    profilePicture: { type: String }, // URL of the picture
    createdAt: { type: Date, default: Date.now },
  });
module.exports = mongoose.model("User", UserSchema);
