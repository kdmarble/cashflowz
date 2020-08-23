const mongoose = require("mongoose");
const transactionSchema = require("../models/transactionModel");

const Transaction = mongoose.model("Transaction", transactionSchema);

const addTransaction = (req, res) => {
  let newTransaction = new Transaction(req.body);

  newTransaction.save((err, Transaction) => {
    if (err) {
      res.send(err);
    } else {
      res.json(Transaction);
    }
  });
};

const getTransactions = (req, res) => {
  Transaction.find({}, (err, Transaction) => {
    if (err) {
      res.send(err);
    } else {
      res.json(Transaction);
    }
  });
};

module.exports.addTransaction = addTransaction;
module.exports.getTransactions = getTransactions;
