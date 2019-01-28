'use strict';

const jwt     = require('jsonwebtoken');
const config  = require("../config/config");

var sql = require('../model/db.users_data');

var verifyToken = function (req, res, next) {
  let token = req.headers['x-access-token'];

  if(!token || 0 === token.length || "null" === token) {
    res.status(403).send({ auth : false, message : "Aucun token n'a été renseigné (le header < x-access-token > est vide)", status : "warning" });
  } else {
    jwt.verify(token, config.secret, function(err, decoded) {
      if(err) {
        res.status(500).send({ auth : false, message : "Échec d'authentification. Erreur -> " + err, status : "warning" });
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
    if(result[0].name == "Membre BDE" || result[0].name == 'Personnel CESI') {
      next();
    } else {
      res.status(403).send({ message : "Requiert le rôle < Membre BDE ou Personnel CESI>", status : "danger" });
    }
  });
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isBdeMember = isBdeMember;

module.exports = authJwt;