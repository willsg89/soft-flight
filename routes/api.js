var express = require('express');
var router = express.Router();

var service = require("./service.js");

//mock data
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(__dirname + "/list.json", "utf8"));
console.log("obj " + obj)
var mockDada = require(__dirname + '/list.json');
console.log(mockDada);

router.get('/projects', function (req, res, next) {
	service.method1();
	res.json(obj);
});

router.post('/project', function (req, res, next) {
	console.log(req.body);


	res.sendStatus(201);
});

module.exports = router;
