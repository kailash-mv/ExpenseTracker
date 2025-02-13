const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount cannot be negative"],
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
