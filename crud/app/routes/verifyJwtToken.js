'use strict';

var sql = require('../model/db.users_data');

var verifyToken = function (req, res, next) {
  let token = req.headers['x-access-token'];

  if(!token || 0 === token.length || "null" === token) {
    res.status(403).send({ auth : false, message : "No token provided (< x-access-token > header empty)", status : "warning" });
  } else {
    sql.query("SELECT id FROM users WHERE token = ?", token, function(err, result) {
      if(err) {
        res.status(500).send({ auth : false, message : "Fail to Authentication. Error -> " + err, status : "warning" });
      } else if(result.length === 0) {
        res.status(403).send({ auth : false, message : "This token is unknow", status : "danger" });
      } else {
        req.userId = result[0].id;
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
      res.status(403).send({ message : "Require BDE Member role", status : "danger" })
    }
  });
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isBdeMember = isBdeMember;

module.exports = authJwt;