'use strict';

const authJwt = require("./verifyJwtToken");

module.exports = function(app) {
  var authController        = require('../controller/authentication.controller');
  var campusesController    = require('../controller/campuses.controller');
  var eventsController      = require('../controller/events.controller');
  var goodiesController     = require('../controller/goodies.controller');
  var registersController   = require('../controller/registers.controller');
  var likesController       = require('../controller/likes.controller');
  var votesController       = require('../controller/votes.controller');
  var categoriesController  = require('../controller/categories.controller');

  //authentication Routes
  app.route('/api/auth/signin').post(authController.signin);

  //campuses Routes
  app.route('/api/campuses')
    .get([authJwt.verifyToken], campusesController.list_all_campuses)
    .post([authJwt.verifyToken, authJwt.isBdeMember], campusesController.create_a_campus);

  app.route('/api/campuses/:campusId')
    .get([authJwt.verifyToken], campusesController.read_a_campus)
    .put([authJwt.verifyToken, authJwt.isBdeMember], campusesController.update_a_campus)
    .delete([authJwt.verifyToken, authJwt.isBdeMember], campusesController.delete_a_campus);


  //events Routes
  app.route('/api/events')
    .get([authJwt.verifyToken], eventsController.list_all_events)
    .post([authJwt.verifyToken], eventsController.create_an_event);

  app.route('/api/events/:eventId')
    .get([authJwt.verifyToken], eventsController.read_an_event)
    .put([authJwt.verifyToken, authJwt.isBdeMember], eventsController.update_an_event)
    .delete([authJwt.verifyToken, authJwt.isBdeMember], eventsController.delete_an_event);


  //goodies Routes
  app.route('/api/goodies')
    .get([authJwt.verifyToken], goodiesController.list_all_goodies)
    .post([authJwt.verifyToken, authJwt.isBdeMember], goodiesController.create_a_goody);

  app.route('/api/goodies/:goodyId')
    .get([authJwt.verifyToken], goodiesController.read_a_goody)
    .put([authJwt.verifyToken, authJwt.isBdeMember], goodiesController.update_a_goody)
    .delete([authJwt.verifyToken, authJwt.isBdeMember], goodiesController.delete_a_goody);

  //registers Routes
  app.route('/api/registers').post([authJwt.verifyToken], registersController.create_a_register);

  app.route('/api/registers/users/:userId/events/:eventId').delete([authJwt.verifyToken], registersController.delete_a_register);

  //likes Routes
  app.route('/api/likes').post([authJwt.verifyToken], likesController.create_a_like);

  app.route('/api/likes/users/:userId/pictures/:pictureId').delete([authJwt.verifyToken], likesController.delete_a_like);

  //votes Routes
  app.route('/api/votes').post([authJwt.verifyToken], votesController.create_a_vote);

  app.route('/api/votes/users/:userId/events/:eventId').delete([authJwt.verifyToken], votesController.delete_a_vote);

  //categories Routes
  app.route('/api/categories').post([authJwt.verifyToken, authJwt.isBdeMember], categoriesController.create_a_category);

  app.route('/api/categories/:categoryId').delete([authJwt.verifyToken, authJwt.isBdeMember], categoriesController.delete_a_category);
};