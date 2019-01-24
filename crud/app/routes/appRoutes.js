'use strict';

const authJwt = require("./verifyJwtToken");

module.exports = function(app) {
  var campusesController  = require('../controller/campuses.controller');
  var eventsController    = require('../controller/events.controller');
  var goodiesController   = require('../controller/goodies.controller');

  //campuses Routes
  app.route('/api/campuses')
    .get(campusesController.list_all_campuses)
    .post([authJwt.verifyToken, authJwt.isBdeMember], campusesController.create_a_campus);

  app.route('/api/campuses/:campusId')
    .get(campusesController.read_a_campus)
    .put([authJwt.verifyToken, authJwt.isBdeMember], campusesController.update_a_campus)
    .delete([authJwt.verifyToken, authJwt.isBdeMember], campusesController.delete_a_campus);


  //events Routes
  app.route('/api/events')
    .get(eventsController.list_all_events)
    .post([authJwt.verifyToken, authJwt.isBdeMember], eventsController.create_an_event);

  app.route('/api/events/:eventId')
    .get(eventsController.read_an_event)
    .put([authJwt.verifyToken, authJwt.isBdeMember], eventsController.update_an_event)
    .delete([authJwt.verifyToken, authJwt.isBdeMember], eventsController.delete_an_event);


  //goodies Routes
  app.route('/api/goodies')
    .get(goodiesController.list_all_goodies)
    .post([authJwt.verifyToken, authJwt.isBdeMember], goodiesController.create_a_goody);

  app.route('/api/goodies/:goodyId')
    .get(goodiesController.read_a_goody)
    .put([authJwt.verifyToken, authJwt.isBdeMember], goodiesController.update_a_goody)
    .delete([authJwt.verifyToken, authJwt.isBdeMember], goodiesController.delete_a_goody);
};