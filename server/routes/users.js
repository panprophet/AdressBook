var express = require('express');
var router = express.Router();
var Countries = require('../models/Countries');
var Cities = require('../models/Cities');
var Task = require('../models/Contacts');

/* GET users listing. */
router.get('/:id?', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
