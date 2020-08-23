const { expect } = require("chai");
const testServer = require("../../test-helpers/test-server");
const testDB = require("../../test-helpers/test-db");

transactionOne = {
  name: "bag",
  amount: 20,
  category: "Shopping",
  type: "Expense",
  owner: "5f42ac9b8c4ebce1f91f9b03"
};

transactionTwo = {
  name: "board",
  amount: 30,
  category: "Materials",
  type: "Expense",
  owner: "5f42ac9b8c4ebce1f91f9b03"
};

transactionThree = {
  name: "check",
  amount: 20,
  category: "Income",
  type: "Income",
  owner: "5f42ac9b8c4ebce1f91f9b03"
};

describe("GET /transactions", function() {
  testServer.useInTest();
  testDB.useInTest();

  it("response with 200 { transactions }", async function() {
    const api = this.api;

    await api.post("/expenses", transactionOne);
    await api.post("/expenses", transactionTwo);
    await api.post("/expenses", transactionThree);

    const reponse = await api.get("/expenses");

    expect(reponse).to.have.property("status", 200);
  });
});
