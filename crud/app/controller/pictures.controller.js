'use strict';

var Model     = require('../model/appModel');
var response  = require('./responseManager');

const table = "pictures";

exports.report_a_picture = function(req, res) {
  Model.getById("link", table, req.params.pictureId, function(error, link) {
    if(error) {
      response.internalServorError(res);
    } else {
      link[0].link += ".report";
      Model.updateById(table, { link : link[0].link }, req.params.pictureId, function(err, report) {
        response.byId(res, err, report);
      });
    }
  });
};

exports.delete_a_picture = function(req, res) {
  Model.removeById(table, req.params.pictureId, function(err, picture) {
    response.byId(res, err, picture);
  });
}