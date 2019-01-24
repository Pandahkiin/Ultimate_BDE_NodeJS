'use strict';

var Model     = require('../model/appModel');
var response  = require('./responseManager');

const campusesTable = "campuses";

exports.list_all_campuses = function(req, res) {
  Model.getAll("*", campusesTable, function(err, campus) {
    response.getAll(res, err, campus);
  });
};

exports.create_a_campus = function(req, res) {
  var newCampus = new Model(campusesTable, req.body);

  //handles null error
  if(!newCampus.location) {
    response.nullEntry(res, "Please provide location");
  } else {
    Model.create(campusesTable, newCampus, function(err, campus) {
      response.create(res, err, campus);
    });
  }
};

exports.read_a_campus = function(req, res) {
  Model.getById("location", campusesTable, req.params.campusId, function(err, campus) {
    response.byId(res, err, campus);
  });
};

exports.update_a_campus = function(req, res) {
  var row = new Model(campusesTable, req.body);

  //handles null error
  if(!row.location) {
    response.nullEntry(res, "Please provide location");
  } else {
    Model.updateById(campusesTable, row, req.params.campusId, function(err, campus) {
      response.byId(res, err, campus);
    });
  }
};

exports.delete_a_campus = function(req, res) {
  Model.removeById(campusesTable, req.params.campusId, function(err, campus) {
    response.byId(res, err, campus);
  });
};