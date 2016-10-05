"use strict";

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var service = require("../services/service.js");

//MOCK
var mockData = JSON.parse(fs.readFileSync(__dirname + "/../models/list.json", "utf8"));

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/projects-mock', function (req, res, next) {
	res.json(mockData);
});

router.get('/projects', function (req, res, next) {
	service.findAllProjetcs(function (data) {
		res.json(data);
	});
});

router.post('/project', function (req, res, next) {
	service.addProject(req.body, function () {
		res.sendStatus(201);
	});
});

router.get('/install', function (req, res, next) {
  var manifestPlist = fs.createReadStream(__dirname + "/../models/manifest.plist");
  manifestPlist.pipe(res);
});

module.exports = router;
