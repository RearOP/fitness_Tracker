const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["workout", "progress", "nutririons", "support"], required: true },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Notification", notificationSchema);