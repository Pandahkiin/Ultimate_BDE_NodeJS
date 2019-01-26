'use strict';

var Model     = require('../model/appModel');
var response  = require('./responseManager');

const table = "votes";

exports.create_a_vote = function(req, res) {
  var newVote = new Model(table, req.body);

  //handles null error
  if(!newVote.id_Users || !newVote.id_Events) {
    response.nullEntry(res, "Renseignez les champs : id_user et id_event");
  } else {
    Model.create(table, newVote, function(err, vote) {
      response.create(res, err, vote);
    });
  }
};

exports.delete_a_vote = function(req, res) {
  Model.removeByIds(table, "id_Events", req.params.userId, req.params.eventId, function(err, vote) {
    response.byId(res, err, vote);
  });
};