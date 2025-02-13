const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  Miscellaneous: {
    type: Number,
    required: true,
    default: 0,
  },
  Food: {
    type: Number,
    required: true,
    default: 0,
  },
  Medicine: {
    type: Number,
    required: true,
    default: 0,
  },
  Dress: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Data", DataSchema);
