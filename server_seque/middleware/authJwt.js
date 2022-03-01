const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  token = !token && req.query.token ? req.query.token : token

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: err
      });
    }
    req.userId = decoded.id;

    User.findByPk(decoded.id).then(user => {
      req.user = user
      next();
    });
  });
};

const authJwt = {
    verifyToken: verifyToken
  };
  module.exports = authJwt;