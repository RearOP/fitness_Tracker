const express = require("express");
const router = express.Router();
const IsloggedIn = require("../middlewares/IsloggedIn");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controller/authcontroller");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", IsloggedIn, logout);



module.exports = router;
