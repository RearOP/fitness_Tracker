const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number },
  reps: { type: Number },
  weight: { type: Number },
  duration: { type: Number }, // for cardio, in minutes
  notes: { type: String }
});

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ["strength", "cardio", "flexibility", "other"], required: true },
  title: { type: String, required: true },
  exercises: [ExerciseSchema],
  tags: [String]
});

module.exports = mongoose.model("Workout", WorkoutSchema);

