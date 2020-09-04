import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

// Mongoose schema for transactions
export const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

// Exports for mongoose and graphql Transaction schemas
export const Transaction = mongoose.model('Transaction', transactionSchema);
export const TransactionTC = composeWithMongoose(Transaction);
