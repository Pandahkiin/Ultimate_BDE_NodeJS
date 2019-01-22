'use strict';

module.exports = function(app) {
  var campusesController  = require('../controller/campusesController');
  var eventsController    = require('../controller/eventsController');
  var goodiesController   = require('../controller/goodiesController');

  //campuses Routes
  app.route('/campuses')
    .get(campusesController.list_all_campuses)
    .post(campusesController.create_a_campus);

  app.route('/campuses/:campusId')
    .get(campusesController.read_a_campus)
    .put(campusesController.update_a_campus)
    .delete(campusesController.delete_a_campus);


  //events Routes
  app.route('/events')
    .get(eventsController.list_all_events)
    .post(eventsController.create_an_event);

  app.route('/events/:eventId')
    .get(eventsController.read_an_event)
    .put(eventsController.update_an_event)
    .delete(eventsController.delete_an_event);


  //goodies Routes
  app.route('/goodies')
    .get(goodiesController.list_all_goodies)
    .post(goodiesController.create_a_goody);

  app.route('/goodies/:goodyId')
    .get(goodiesController.read_a_goody)
    .put(goodiesController.update_a_goody)
    .delete(goodiesController.delete_a_goody);
};