'use strict';

function created(res, result) { 0 === result ? res.status(201).send({message : "Enregistrement correctement créé", status : "success" }) : res.status(201).send({ id : result, message : "Enregistrement correctement créé", status : "success" }); }
function ok(res, result)      { res.status(200).send({ result, message : "Requête effectuée", status : "success" }); }
function badRequest(res, err) { res.status(400).send({ err, message : "La requête est erronée", status : "warning" }); }
function notFound(res)        { res.status(404).send({ code : "ER_ID_NOT_FOUND", message : "Cet ID n'existe pas", status : "warning" }); }

exports.nullEntry = function(res, result) {
  res.status(400).send({ code : "ER_NULL_ENTRY", message : result, status : "warning" });
}

exports.userNotFound = function(res) {
  res.status(404).send({ code : "ER_USER_NOT_FOUND", message : "Email not found, please provide another one", status : "warning" });
}

exports.getAll = function(res, err, result) {
  if(err) {
    res.status(500).send({ error : true, response : null, status : "warning" });
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