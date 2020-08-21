require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./itemRoutes");
const connectionString = `mongodb+srv://kdmarble:${process.env.DB_PASS}@cashflowz.wgzzf.gcp.mongodb.net/cashflowz?retryWrites=true&w=majority`;
const path = __dirname + '/views/';

mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.static(path));

routes(app);

app.listen(PORT, function () {
  console.log('Example app listening on port 8080!')
})
