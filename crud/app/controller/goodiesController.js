'use strict';

var Model = require('../model/appModel');

const goodiesTable = "goodies";

exports.list_all_goodies = function(req, res) {
  const join = "INNER JOIN campuses ON id_Campuses = campuses.id";
  Model.getAll(goodiesTable + ".id, " + goodiesTable + ".name, price, description, stock, purchase_order, location", goodiesTable, function(err, goody) {
    if(err) {
      res.status(500).send({ error : true, response : null });
    } else {
      res.send(goody);
    }
  }, join);
};

exports.create_a_goody = function(req, res) {
  var newGoody = new Model(goodiesTable, req.body);

  //handles null error
  if(!newGoody.name || (!newGoody.price && newGoody.price != 0) || !newGoody.description || (!newGoody.stock && newGoody.stock != 0) || (!newGoody.purchase_order && newGoody.purchase_order != 0) || !newGoody.id_Categories || !newGoody.id_Campuses) {
    res.status(400).send({ error : true, message : "Please provide name, price, description, stock, purchase_order, id_category and id_campus" });
  } else {
    Model.create(goodiesTable, newGoody, function(err, goody) {
      if(err) {
        res.send(err);
      } else {
        res.json(goody);
      }
    });
  }
};

exports.read_a_goody = function(req, res) {
  const join = "INNER JOIN campuses ON id_Campuses = campuses.id";
  Model.getById(goodiesTable + ".name, price, description, stock, purchase_order, location", goodiesTable, req.params.goodyId, function(err, goody) {
    if(err) {
      res.send(err);
    } else {
      res.json(goody);
    }
  }, join);
};

exports.update_a_goody = function(req, res) {
  var row = new Model(goodiesTable, req.body);

  //handles null error
  if(!row.name && (!row.price && row.price != 0) && !row.description && (!row.stock && row.stock != 0) && (!row.purchase_order && row.purchase_order != 0) && !row.id_Categories && !row.id_Campuses) {
    res.status(400).send({ error : true, message : "Please provide name, price, description, stock, purchase_order, id_category and/or id_campus" })
  } else {
    Model.updateById(goodiesTable, row, req.params.goodyId, function(err, goody) {
      if(err) {
        res.send(err);
      } else {
        res.json(goody);
      }
    });
  }
};

exports.delete_a_goody = function(req, res) {
  Model.removeById(goodiesTable, req.params.goodyId, function(err, goody) {
    if(err) {
      res.send(err);
    } else {
      res.json({ message : "Task successfully deleted" });
    }
  });
};