const express = require("express");
const router = express.Router();
const notificationModel = require("../models/notifications_model");
const IsloggedIn = require("../middlewares/IsloggedIn");

/* ──────────────────────────────────────────
   GET /api/notifications
   Return all notifications for the logged-in user
 ──────────────────────────────────────────*/
router.get("/fetch/:userId", IsloggedIn, async (req, res) => {
  try {
    const list = await notificationModel
      .find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ──────────────────────────────────────────
   POST /api/notifications
   Create a new notification (could be from system or admin)
 ──────────────────────────────────────────*/
router.post("/", IsloggedIn, async (req, res) => {
  try {
    const payload = {
      userId: req.body.userId || req.user.id, // allow sending to self or others
      type: req.body.type || "alert",
      message: req.body.message,
    };
    const created = await notificationModel.create(payload);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ──────────────────────────────────────────
   PUT /api/notifications/:id/read
   Mark a single notification as read
 ──────────────────────────────────────────*/
router.put("/read/:id", IsloggedIn, async (req, res) => {
  try {
    const updated = await notificationModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { read: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ──────────────────────────────────────────
   PUT /api/notifications/read-all
   Mark all of the user’s notifications as read
 ──────────────────────────────────────────*/
router.put("/read-all", IsloggedIn, async (req, res) => {
  try {
    await notificationModel.updateMany(
      { userId: req.user.id, read: false },
      { $set: { read: true } }
    );
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ──────────────────────────────────────────
   DELETE /api/notifications/:id
   Remove a notification
 ──────────────────────────────────────────*/
router.delete("/delete/:id", IsloggedIn, async (req, res) => {
  try {
    const deleted = await notificationModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
