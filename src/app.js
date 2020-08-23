require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/transactionRoutes");

const app = express();
const connectionString = `mongodb+srv://kdmarble:${process.env.DB_PASS}@cashflowz.wgzzf.gcp.mongodb.net/cashflowz?retryWrites=true&w=majority`;
const path = `${__dirname}/views/`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Constants
const PORT = 8080;

app.use(express.json());
app.use(express.static(path));

routes(app);

app.listen(PORT, () => {
  console.log("Example app listening on port 8080!");
});
