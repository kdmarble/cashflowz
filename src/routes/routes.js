const transactionControllers = require("../services/transactionControllers");
const authController = require("../services/authController");
const verifyToken = require("../services/verifyToken");
const path = require("path");

module.exports = routes = app => {
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
