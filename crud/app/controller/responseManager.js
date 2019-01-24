'use strict';

function created(res, result) { res.status(201).send({ id : result, message : "Row successefully created" }); }
function ok(res, result)      { res.send(result); }
function badRequest(res, err) { res.status(400).send(err); }
function notFound(res)        { res.status(404).send({ code : "ER_ID_NOT_FOUND", message : "This ID doesn't exist" }); }

exports.nullEntry = function(res, result) {
  res.status(400).send({ code : "ER_NULL_ENTRY", message : result });
}

exports.userNotFound = function(res) {
  res.status(404).send({ code : "ER_USER_NOT_FOUND", message : "Email not found, please provide another one" });
}

exports.getAll = function(res, err, result) {
  if(err) {
    res.status(500).send({ error : true, response : null });
  } else {
    ok(res, result);
  }
}

exports.create = function(res, err, result) {
  if(err) {
    badRequest(res, err);
  } else {
    created(res, result);
  }
}

exports.byId = function(res, err, result) {
  if(err == "Not found") {
    notFound(res);
  } else if(err) {
    badRequest(res, err);
  } else {
    ok(res, result);
  }
}