const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default: "uncategorized"
  },
  type: {
    type: String,
    enum: ["Income", "Expense"],
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = transactionSchema;
