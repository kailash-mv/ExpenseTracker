const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

router.get("/", async (req, res) => {
  const budget = await Budget.findOne();
  res.json(budget);
});

router.post("/", async (req, res) => {
  const { totalSpent, totalBudget, safeToSpend } = req.body;

  try {
    let budget = await Budget.findOne();
    if (!budget) {
      budget = new Budget({
        totalBudget: 5000,
        totalSpent: 0,
        safeToSpend: 5000 / 30,
      });
    }
    budget.totalBudget = totalBudget;
    budget.totalSpent = totalSpent;
    budget.safeToSpend = safeToSpend;

    await budget.save();
    res.status(201).json({ message: "Budget updated successfully" });
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
