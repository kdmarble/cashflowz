import mongoose from 'mongoose';
import { Transaction } from '../models/transactionModel';

// POST transaction middleware
export const addTransaction = (req, res) => {
    // Create new transaction
    const newTransaction = new Transaction({
        name: req.body.name,
        amount: req.body.amount,
        category: req.body.category,
        type: req.body.type,
        owner: req.decoded.id,
    });

    // Save to db
    newTransaction.save((err, Transaction) => {
        if (err) {
            res.send(err);
        } else {
            res.json(Transaction);
        }
    });
};

// GET transaction middlware
export const getTransactions = (req, res) => {
    // Find all transactions with owner's ID
    Transaction.find({ owner: req.decoded.id }, (err, Transaction) => {
        if (err) {
            res.send(err);
        } else {
            res.json(Transaction);
        }
    });
};
