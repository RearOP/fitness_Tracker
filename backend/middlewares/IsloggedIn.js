const jwt = require("jsonwebtoken");
const userModel = require("../models/user_model");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    // console.log("No token found");
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel
      .findOne({ email: decode.email })
      .select("-password");
    if (!user) {
      // console.log("User not found from decoded email:", decoded.email);
      res.clearCookie("token");
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    // console.error("JWT Error:", error.message);
    res.clearCookie("token");
    return res.status(401).json({ message: "Unauthorized" });
  }
};
