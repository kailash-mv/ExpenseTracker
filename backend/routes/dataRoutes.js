const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  const { amount, name } = req.body;
  try {
    let updatedData = await Data.updateOne(
      {},
      { $inc: { [name]: amount } },
      { upsert: true }
    );

    if (updatedData.matchedCount === 0) {
      return res.status(404).json({ message: "No document to update" });
    }

    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id", async (req, res) => {
  const { amount, name } = req.body;
  try {
    let updatedData = await Data.updateOne(
      {},
      { $inc: { [name]: -amount } },
      { upsert: true }
    );
    if (updatedData.matchedCount === 0) {
      return res.status(404).json({ message: "No document to update" });
    }

    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/edit", async (req, res) => {
  const { amount, prevname, name } = req.body;

  console.log("Prevname:", prevname, "Amount:", amount, "Name:", name);

  if (!prevname || !name) {
    return res
      .status(400)
      .json({ message: "Previous and new category names are required" });
  }

  try {
    const existingData = await Data.findOne({});
    console.log("Existing Data:", existingData);

    if (!existingData || existingData[prevname] === undefined) {
      return res
        .status(404)
        .json({ message: `Category '${prevname}' not found` });
    }

    const newPrevValue = Math.max(0, existingData[prevname] - amount);
    const newNameValue = (existingData[name] || 0) + amount;

    let updatedData = await Data.updateOne(
      {},
      { $set: { [prevname]: newPrevValue, [name]: newNameValue } }
    );

    console.log("Update Response:", updatedData);

    if (updatedData.matchedCount === 0) {
      return res.status(404).json({ message: "No document to update" });
    }

    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
