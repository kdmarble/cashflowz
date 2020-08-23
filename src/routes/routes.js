const transactionControllers = require("../services/transactionControllers");
const authController = require("../services/authController");
const verifyToken = require("../services/verifyToken").verifyToken;

const addTransaction = transactionControllers.addTransaction;
const getTransactions = transactionControllers.getTransactions;
const registerUser = authController.registerUser;
const getRegisteredUser = authController.getRegisteredUser;
const loginUser = authController.loginUser;
const path = require("path");

const routes = app => {
  app.route("/").get((req, res) => {
    res.sendStatus(200);
  });

  app
    .route("/register")
    .post(verifyToken, registerUser)
    .get(verifyToken, getRegisteredUser);

  app.route("/login").post(loginUser);

  app
    .route("/transactions")
    .post(verifyToken, addTransaction)
    .get(verifyToken, getTransactions);
};

module.exports = routes;
