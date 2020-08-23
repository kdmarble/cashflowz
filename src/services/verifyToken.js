const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req, res, next) => {
  var token = req.headers["x-json-web-token"];

  if (!token) {
    res.status(403).send("Unverified, no token provided");
  } else {
    jwt.verify(token, config.secretKey, (error, decoded) => {
      if (error) {
        res.status(500).send("Unverified, failure to verify token");
      } else {
        req.token = token;
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports.verifyToken = verifyToken;
