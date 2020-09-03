const mongoose = require("mongoose");
import { composeWithMongoose } from "graphql-compose-mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const User = mongoose.model("User", userSchema);
export const UserTC = composeWithMongoose(User);
