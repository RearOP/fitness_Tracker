const express = require("express");
const router = express.Router();
const ProgressModel = require("../models/progress_model");
const verifyToken = require("../middlewares/verifytoken");
const notificationModel = require("../models/notifications_model");

// GET all progress records for the logged-in user
router.get("/fetch/:id", verifyToken, async (req, res) => {
  try {
    const records = await ProgressModel.find({ userId: req.params.id }).sort({
      date: -1,
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/fetchAdmin", verifyToken, async (req, res) => {
  try {
    const records = await ProgressModel.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST add a new progress entry
router.post("/add-progress", verifyToken, async (req, res) => {
  try {
    const newProgress = await ProgressModel.create({
      userId: req.user.id,
      date: req.body.date || new Date(),
      weight: req.body.weight,
      measurements: req.body.measurements,
      performance: req.body.performance,
    });
    if (!newProgress) {
      return res.status(400).json({ error: "Failed to create workout" });
    }

    await notificationModel.create({
      userId: req.user.id,
      type: "progress",
      message: `Great job! Your progress for ${newProgress.date.toDateString()} has been saved.`,
    });

    // const saved = await newProgress.save();
    return res.status(201).json(newProgress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/fetchupdate/:id", verifyToken, async (req, res) => {
  try {
    const record = await ProgressModel.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Progress not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update a progress entry by ID
router.put("/edit-progress/:id", verifyToken, async (req, res) => {
  try {
    const updated = await ProgressModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Progress not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a progress entry
router.delete("/deleteProgress/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await ProgressModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) return res.status(404).json({ error: "Progress not found" });
    res.json({ message: "Progress entry deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
