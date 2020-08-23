const mongoose = require("mongoose");
const transactionSchema = require("../models/transactionModel");
const getRegisteredUser = require("../services/authController")
  .getRegisteredUser;

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = addTransaction = (req, res) => {
  let newTransaction = new Transaction({
    name: req.body.name,
    amount: req.body.amount,
    category: req.body.category,
    type: req.body.type,
    owner: req.decoded.id
  });

  newTransaction.save((err, Transaction) => {
    if (err) {
      res.send(err);
    } else {
      res.json(Transaction);
    }
  });
};

module.exports = getTransactions = (req, res) => {
  Transaction.find({ owner: req.decoded.id }, (err, Transaction) => {
    if (err) {
      res.send(err);
    } else {
      res.json(Transaction);
    }
  });
};
