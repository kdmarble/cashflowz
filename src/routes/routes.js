import {
  registerUser,
  getRegisteredUser,
  loginUser
} from "../services/authController";
import { verifyToken } from "../services/verifyToken";
import {
  addTransaction,
  getTransactions
} from "../services/transactionControllers";
const path = require("path");

export const routes = app => {
  app.route("/").get((req, res) => {
    res.sendStatus(200);
  });

  app
    .route("/register")
    .post(registerUser)
    .get(verifyToken, getRegisteredUser);

  app.route("/login").post(loginUser);

  app
    .route("/transactions")
    .post(verifyToken, addTransaction)
    .get(verifyToken, getTransactions);
};
