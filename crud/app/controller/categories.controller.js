'use strict';

var Model     = require('../model/appModel');
var response  = require('./responseManager');

const table = "categories";

exports.create_a_category = function(req, res) {
  var newCategory = new Model(table, req.body);

  //handles null error
  if(!newCategory.category) {
    response.nullEntry(res, "Renseignez le champ category");
  } else {
    Model.create(table, newCategory, function(err, category) {
      response.create(res, err, category);
    });
  }
};

exports.delete_a_category = function(req, res) {
  Model.removeById(table, req.params.categoryId, function(err, category) {
    response.byId(res, err, category);
  });
};