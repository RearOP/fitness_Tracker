const mongoose = require("mongoose");
const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  weight: { type: Number, required: true },
  measurements: {
    chest: { type: Number },
    waist: { type: Number },
    biceps: { type: Number },
  },
  performance: {
    runTime: { type: Number },
    maxLift: { type: Number },
  },
});
module.exports = mongoose.model("Progress", ProgressSchema);
