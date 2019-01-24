'use strict';

var Model     = require('../model/appModel');
var response  = require('./responseManager');

const goodiesTable = "goodies";

exports.list_all_goodies = function(req, res) {
  const join = "INNER JOIN campuses ON id_Campuses = campuses.id";
  Model.getAll(goodiesTable + ".id, " + goodiesTable + ".name, price, description, stock, total_orders, location", goodiesTable, function(err, goody) {
    response.getAll(res, err, goody);
  }, join);
};

exports.create_a_goody = function(req, res) {
  var newGoody = new Model(goodiesTable, req.body);

  //handles null error
  if(!newGoody.name || (!newGoody.price && newGoody.price != 0) || !newGoody.description || (!newGoody.stock && newGoody.stock != 0) ||  !newGoody.id_Categories || !newGoody.id_Campuses) {
    response.nullEntry(res, "Renseignez les champs : name, price, description, stock, id_category and id_campus (optional : image and total_orders)" );
  } else {
    Model.create(goodiesTable, newGoody, function(err, goody) {
      response.create(res, err, goody);
    });
  }
};

exports.read_a_goody = function(req, res) {
  const join = "INNER JOIN campuses ON id_Campuses = campuses.id";
  Model.getById(goodiesTable + ".name, price, description, stock, total_orders, location", goodiesTable, req.params.goodyId, function(err, goody) {
    response.byId(res, err, goody);
  }, join);
};

exports.update_a_goody = function(req, res) {
  var row = new Model(goodiesTable, req.body);

  //handles null error
  if(!row.name && (!row.price && row.price != 0) && !row.description && (!row.stock && row.stock != 0) && (!row.total_orders && row.total_orders != 0) && !row.id_Categories && !row.id_Campuses &&!row.image) {
    response.nullEntry(res, "Renseignez les champs : name, price, description, stock, total_orders, id_category, id_campus and/or image" );
  } else {
    Model.updateById(goodiesTable, row, req.params.goodyId, function(err, goody) {
      response.byId(res, err, goody);
    });
  }
};

exports.delete_a_goody = function(req, res) {
  Model.removeById(goodiesTable, req.params.goodyId, function(err, goody) {
    response.byId(res, err, goody);
  });
};