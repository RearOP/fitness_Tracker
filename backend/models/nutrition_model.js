const mongoose = require("mongoose");

const MealItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String }, // e.g., "1 cup", "100g"
  calories: { type: Number },
  protein: { type: Number },
  carbs: { type: Number },
  fat: { type: Number }
});

const NutritionLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
    required: true
  },
  items: { type: [MealItemSchema], required: true },
  notes: { type: String }
});

module.exports = mongoose.model("NutritionLog", NutritionLogSchema);
