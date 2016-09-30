"use strict";

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
//var mime = require('mime');
var service = require("./service.js");

	service.method2("xx")


//MOCK
var mockData = JSON.parse(fs.readFileSync(__dirname + "/../models/list.json", "utf8"));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/projects', function (req, res, next) {
	service.method1();
	res.json(mockData);
});

router.post('/project', function (req, res, next) {
	console.log(req.body);
	service.method2()
	res.sendStatus(201);
});

router.get('/install', function(req, res, next) {
  var manifest_plist = fs.createReadStream(__dirname + "/../models/manifest.plist");
  manifest_plist.pipe(res);
});

module.exports = router;
