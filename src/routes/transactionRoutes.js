const controllers = require("../services/transactionControllers");
const addTransaction = controllers.addTransaction;
const getTransactions = controllers.getTransactions;
const path = require("path");

const routes = app => {
  app
    .route("/transactions")
    .post(addTransaction)
    .get(getTransactions);
};

module.exports = routes;
