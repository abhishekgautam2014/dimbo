exports.register = function () {
  return `var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;

exports.signup = async (req, res) => {
  try {
    // Save User to Database
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    if (user) {
      const token = jwt.sign({ id: user.dataValues.id }, process.env.SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({
        user: user.dataValues,
        auth: true,
        accessToken: token,
        message: "Registered successfully!"
      });
    }
  } catch (error) {
    res.status(500).send({ reason: error });
  }
}`;
};

exports.login = function () {
  return `var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.User;

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      return res.status(404).send({ status: 0, reason: "User Not Found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        status: 0,
        auth: false,
        accessToken: null,
        reason: "Invalid Password!"
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });
    return res.status(200).send({
      user: user,
      auth: true,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ reason: error.message });
  }
};`;
};

exports.authMigration = function () {
  return `var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.User;

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      return res.status(404).send({ status: 0, reason: "User Not Found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        status: 0,
        auth: false,
        accessToken: null,
        reason: "Invalid Password!"
      });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    return res.status(200).send({
      user: user,
      auth: true,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ reason: error.message });
  }
};`;
};

exports.authModel = function () {
  return `var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.User;

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      return res.status(404).send({ status: 0, reason: "User Not Found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        status: 0,
        auth: false,
        accessToken: null,
        reason: "Invalid Password!"
      });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    return res.status(200).send({
      user: user,
      auth: true,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ reason: error.message });
  }
};`;
};

exports.authRouteTemplate = function () {
  return `
module.exports = function(app) {

  const registerController = require("./registerController.js");
  const loginController = require("./loginController.js");
  
  
  app.post(
      "/api/register",
      registerController.signup
  );
  app.post(
      "/api/login",
      loginController.signin
  );
  
}`;
}