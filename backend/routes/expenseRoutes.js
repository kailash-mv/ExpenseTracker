const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ timestamp: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, amount } = req.body;
  try {
    const newExpense = new Expense({ name, amount });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const expenses = await Expense.find({ name: req.params.name });
    if (expenses.length === 0) {
      return res.status(404).json({ message: "expense not found" });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const name = await Expense.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.json(name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
