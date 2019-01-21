'use strict';

module.exports = function(app) {
  var controller = require('../controller/appController');

  //campuses Routes
  app.route('/campuses')
    .get(controller.list_all_campuses)
    .post(controller.create_a_campus);

  app.route('/campuses/:campusId')
    .get(controller.read_a_campus)
    .put(controller.update_a_campus)
    .delete(controller.delete_a_campus);


  //events Routes
  app.route('/events')
    .get(controller.list_all_events)
    .post(controller.create_an_event);

  app.route('/events/:eventId')
    .get(controller.read_an_event)
    .put(controller.update_an_event)
    .delete(controller.delete_an_event);


  //goodies Routes
  /*app.route('/goodies')
    .get(controller.list_all_goodies)
    .post(controller.create_a_goody);

  app.route('/goodies/:goodyId')
    .get(controller.read_a_goody)
    .put(controller.update_a_goody)
    .delete(controller.delete_a_goody);*/
};