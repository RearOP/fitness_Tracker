const express = require("express");
const router = express.Router();
const IsloggedIn = require("../middlewares/IsloggedIn");
const nutritionModel = require("../models/nutrition_model");
const notifications_model = require("../models/notifications_model");

router.get("/fetch/:userid", IsloggedIn, async (req, res) => {
  try {
    const logs = await nutritionModel
      .find({ user: req.params.userid })
      .sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/fetchAdmin", IsloggedIn, async (req, res) => {
  try {
    const logs = await nutritionModel
      .find()
      .sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST create a nutrition log
router.post("/add-nutrition", IsloggedIn, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const newLog = await nutritionModel.create({
      ...req.body,
      user: req.user.id,
    });

    if (!newLog) {
      return res.status(400).json({ error: "Failed to create nutrition log" });
    }

    await notifications_model.create({
      userId: req.user.id,
      type: "NUTRITION", // Use the correct enum value as defined in your schema
      message: `Great job! Your “${newLog.mealType || "meal"}” nutrition log has been saved.`,
    });
    return res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a log
router.put("/updateNutritions/:id", IsloggedIn, async (req, res) => {
  try {
    const updated = await nutritionModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Log not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a log
router.delete("/deleteNutritions/:id", IsloggedIn, async (req, res) => {
  try {
    const deleted = await nutritionModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted) return res.status(404).json({ error: "Log not found" });
    res.json({ message: "Log deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
