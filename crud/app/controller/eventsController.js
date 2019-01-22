'use strict';

var Model = require('../model/appModel');

const eventsTable = "events";

exports.list_all_events = function(req, res) {
  const join = "INNER JOIN campuses ON id_Campuses = campuses.id INNER JOIN repetitions ON id_Repetitions = repetitions.id";
  Model.getAll(eventsTable + ".id, name, description, date, price_participation, location, repetition", eventsTable, function(err, event) {
    if(err) {
      res.status(500).send({ error : true, response : null });
    } else {
      res.send(event);
    }
  }, join);
};

exports.create_an_event = function(req, res) {
  var newEvent = new Model(eventsTable, req.body);

  //handles null error
  if(!newEvent.name || !newEvent.description || !newEvent.date || (!newEvent.price_participation && newEvent.price_participation != 0) || !newEvent.id_Campuses || !newEvent.id_Repetitions) {
    res.status(400).send({ error : true, message : "Please provide name, description, date (yyyy/mm/dd), price, id_campus and id_repetition" });
  } else {
    Model.create(eventsTable, newEvent, function(err, event) {
      if(err) {
        res.send(err);
      } else {
        res.json(event);
      }
    });
  }
};

exports.read_an_event = function(req, res) {
  const join = "INNER JOIN campuses ON id_Campuses = campuses.id INNER JOIN repetitions ON id_Repetitions = repetitions.id";
  Model.getById("name, description, date, price_participation, location, repetition", eventsTable, req.params.eventId, function(err, event) {
    if(err) {
      res.send(err);
    } else {
      res.json(event);
    }
  }, join);
};

exports.update_an_event = function(req, res) {
  var row = new Model(eventsTable, req.body);

  //handles null error
  if(!row.name && !row.description && !row.date && (!row.price_participation && row.price_participation != 0) && !row.id_Campuses && !row.id_Repetitions) {
    res.status(400).send({ error : true, message : "Please provide name, description, date (yyyy/mm/dd), price, id_campus and/or id_repetition" })
  } else {
    Model.updateById(eventsTable, row, req.params.eventId, function(err, event) {
      if(err) {
        res.send(err);
      } else {
        res.json(event);
      }
    });
  }
};

exports.delete_an_event = function(req, res) {
  Model.removeById(eventsTable, req.params.eventId, function(err, event) {
    if(err) {
      res.send(err);
    } else {
      res.json({ message : "Task successfully deleted" });
    }
  });
};