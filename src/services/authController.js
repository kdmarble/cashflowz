const mongoose = require("mongoose");
const userSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

export const registerUser = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password);
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  const doesUserExist = User.exists({ email: newUser.email }, (err, result) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });

  if (doesUserExist === true) {
    res.status(401).send({ auth: false, message: "User already exists" });
    return;
  }

  newUser.save((error, User) => {
    var token = jwt.sign({ id: User._id }, config.secretKey, {
      expiresIn: 86400
    });

    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send({ auth: true, token: token });
    }
  });
};

export const getRegisteredUser = (req, res) => {
  var token = req.token;
  var decoded = req.decoded;

  if (!token) {
    res.status(401).send({ auth: false, message: "Token not provided" });
  } else {
    jwt.verify(token, config.secretKey, (error, decoded) => {
      if (error) {
        res
          .status(500)
          .send({ auth: false, message: "Token can not be verified" });
      } else {
        User.findById(decoded.id, { password: 0 }, (error, User) => {
          if (error) {
            res.status(500).send("There was an error finding that user");
          } else if (!User) {
            res.status(404).send("Could not locate that user");
          } else {
            res.status(200).send(User);
          }
        });
      }
    });
  }
};

export const loginUser = (req, res) => {
  User.findOne({ email: req.body.email }, (error, User) => {
    if (error) {
      res.status(500).send("There was an error with login");
    } else if (!User) {
      res.status(404).send("Sorry, that user does not appear to exist");
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        User.password
      );

      if (!passwordIsValid) {
        res.status(401).send({ auth: false, token: null });
      } else {
        var token = jwt.sign({ id: User._id }, config.secretKey, {
          expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
      }
    }
  });
};
