const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = transactionSchema = new Schema({
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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
