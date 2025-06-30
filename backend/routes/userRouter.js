const express = require("express");
const router = express.Router();
const IsloggedIn = require("../middlewares/IsloggedIn");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controller/authcontroller");
const user_model = require("../models/user_model");

router.post("/register", registerUser);

router.get("/fetch", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const users = await user_model.find({role : "user"}).limit(limit);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/login", loginUser);

router.get("/logout", IsloggedIn, logout);



module.exports = router;
