'use strict';

const config = require('../config/config');

var jwt       = require('jsonwebtoken');
var bcrypt    = require('bcryptjs');
var sql     = require('../model/db.users_data');
var response  = require('./responseManager');

exports.signin = function (req, res) {
  let email = req.body.email;

  //handles null error
  if(!email) {
    response.nullEntry(res, "Veuillez renseignez votre adresse mail");
  } else {
    sql.query("SELECT id, email, password FROM users WHERE email = ?", email, function(err, result) {
      if(err) {
        res.status(500).send(err);
      } else if(result.length == 0) {
        response.userNotFound(res);
      } else {
        let password = req.body.password;

        //handles null error
        if(!password) {
          response.nullEntry(res, "Veuillez renseignez votre mot de passe");
        } else {
          var passwordIsValid = bcrypt.compareSync(password, result[0].password);
          if(!passwordIsValid && password != result[0].password) {
            res.status(401).send({ auth : false, accessToken : null, message : "Mot de passe invalide" });
          } else {
            var token = jwt.sign({ id : result[0].id }, config.secret, { expiresIn : 86400 });
            res.status(200).send({ auth : true, accessToken : token });
          }
  
        }
      }
    });
  }
}