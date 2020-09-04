import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

// mongoose schema for Users
export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Exports mongoose and graphql User schemas
export const User = mongoose.model('User', userSchema);
export const UserTC = composeWithMongoose(User);
