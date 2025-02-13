const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  totalBudget: {
    type: Number,
    require: true,
    default: 5000,
  },
  totalSpent: {
    type: Number,
    required: true,
    default: 0,
  },
  safeToSpend: {
    type: Number,
    required: true,
    default: 166.66,
  },
});

module.exports = mongoose.model("Budget", BudgetSchema);
