const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    required:true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  phone: {
    type: Number,
    minlength: 11,
    required: true,
  },
  profilePic: {
    type: String,
    default:
      "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
  },
  backgroundImage: {
    type: String,
    default: "https://bdu.ac.bd/uploads/topics/default.png",
  },
  role: {
    type: String,
    default: "user",
  },
  preferences: {
    units: {
      type: String,
      enum: ["metric", "imperial"],
      default: "metric",
    },
    notificationsEnabled: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "dark",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("user", userSchema);
