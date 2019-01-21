'use strict';

var sql = require('./db');

var Model = function(table, model) {
  //Campus object constructor
  if(table == "campuses") {
    this.location = model.location;
  }
  //Event object constructor
  else if(table == "events") {
    if(model.name)                      { this.name                 = model.name; }
    if(model.description)               { this.description          = model.description; }
    if(model.date)                      { this.date                 = model.date; }
    if(model.price || model.price == 0) { this.price_participation  = model.price; }
    if(model.id_campus)                 { this.id_Campuses          = model.id_campus; }
    if(model.id_repetition)             { this.id_Repetitions       = model.id_repetition; }
  }
  //Goody object constructor
  else if(table == "goodies") {
    if(model.name)                                        { this.name           = model.name; }
    if(model.price || model.price == 0)                   { this.price          = model.price; }
    if(model.description)                                 {this.description     = model.description; }
    if(model.stock || model.stock == 0)                   { this.stock          = model.stock; }
    if(model.purchase_order || model.purchase_order == 0) { this.purchase_order = model.purchase_order; }
    if(model.id_category)                                 { this.id_Categories  = model.id_category; }
    if(model.id_campus)                                   { this.id_Campuses    = model.id_campus; }
  }
};

Model.create = function(table, newRow, result) {
  sql.query("INSERT INTO " + table + " SET ?", newRow, function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Model.getById = function(fields, table, rowId, result, join = "") {
  sql.query("SELECT " + fields + " FROM " + table + " " + join + " WHERE " + table + ".id = ?", rowId, function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Model.getAll = function(fields, table, result, join = "") {
  sql.query("SELECT " + fields + " FROM " + table + " " + join, function(err, res) {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Model.updateById = function(table, row, id, result) {
  sql.query("UPDATE " + table + " SET ? WHERE id = ?", [row, id], function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Model.removeById = function(table, id, result) {
  sql.query("DELETE FROM " + table + " WHERE id = ?", id, function(err, res) {
    if(err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Model;