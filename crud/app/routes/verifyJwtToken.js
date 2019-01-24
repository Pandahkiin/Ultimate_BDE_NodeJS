'use strict';

const jwt     = require('jsonwebtoken');
const config  = require("../config/config");

var sql = require('../model/db.users_data');

var verifyToken = function (req, res, next) {
  let token = req.headers['x-access-token'];

  if(!!token) {
    res.status(403).send({ auth : false, message : "No token provided (< x-access-token > header empty)" });
  } else {
    jwt.verify(token, config.secret, function(err, decoded) {
      if(err) {
        res.status(500).send({ auth : false, message : "Fail to Authentication. Error -> " + err });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
}

var isBdeMember = function(req, res, next) {
  var id = req.userId;

  sql.query("SELECT name FROM users INNER JOIN roles ON users.id_role = roles.id WHERE users.id = ?", id, function(err, result) {
    if(result[0].name == "Membre BDE") {
      next();
    } else {
      res.status(403).send({ message : "Require BDE Member role" })
    }
  });
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isBdeMember = isBdeMember;

module.exports = authJwt;