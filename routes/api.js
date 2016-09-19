var express = require('express');
var router = express.Router();
var fs = require('fs');
//var obj = JSON.parse(fs.readFileSync('./list.json', 'utf8'));

var config = require('./list.json');
console.log(config);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/xxx', function(req, res, next) {
  res.json(config);
});

module.exports = router;
