'use strict';

var Model     = require('../model/appModel');

const campusesTable = "campuses";

exports.list_all_campuses = function(req, res) {
  Model.getAll("*", campusesTable, function(err, campus) {
    if(err) {
      res.status(500).send({ error : true, response : null });
    } else {
      res.send(campus);
    }
  });
};

exports.create_a_campus = function(req, res) {
  var newCampus = new Model(campusesTable, req.body);

  //handles null error
  if(!newCampus.location) {
    res.status(400).send({ error : true, message : "Please provide location" });
  } else {
    Model.create(campusesTable, newCampus, function(err, campus) {
      if(err) {
        res.send(err);
      } else {
        res.status(201).json(campus);
      }
    });
  }
};

exports.read_a_campus = function(req, res) {
  Model.getById("location", campusesTable, req.params.campusId, function(err, campus) {
    if(err) {
      res.send(err);
    } else {
      res.json(campus);
    }
  });
};

exports.update_a_campus = function(req, res) {
  var row = new Model(campusesTable, req.body);

  //handles null error
  if(!row.location) {
    res.status(400).send({ error : true, message : "Please provide location" })
  } else {
    Model.updateById(campusesTable, row, req.params.campusId, function(err, campus) {
      if(err) {
        res.send(err);
      } else {
        res.json(campus);
      }
    });
  }
};

exports.delete_a_campus = function(req, res) {
  Model.removeById(campusesTable, req.params.campusId, function(err, campus) {
    if(err) {
      res.send(err);
    } else {
      res.json({ message : "Task successfully deleted" });
    }
  });
};