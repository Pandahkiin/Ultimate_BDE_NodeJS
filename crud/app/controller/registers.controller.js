'use strict';

var Model     = require('../model/appModel');
var response  = require('./responseManager');

const table = "registers";

exports.create_a_register = function(req, res) {
  var newRegister = new Model(table, req.body);

  //handles null error
  if(!newRegister.id_Users || !newRegister.id_Events) {
    response.nullEntry(res, "Renseignez les champs : id_user et id_event");
  } else {
    Model.create(table, newRegister, function(err, register) {
      response.create(res, err, register);
    });
  }
};