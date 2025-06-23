const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profile_Router");
const workoutRouter = require("./routes/workoutRouter");
const nutritionRouter = require("./routes/nutritionRouter");
const verifytoken = require("./middlewares/verifytoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
require("dotenv").config();

app.use("/auth", userRouter);
app.use("/profile", profileRouter );
app.use("/workouts", workoutRouter );
app.use("/nutritions", nutritionRouter );

app.get("/check", verifytoken, (req, res) => {
  res.status(200).json({ loggedIn: true, user: req.user, role: req.user.role });
});
app.listen(3000);