var express = require('express');
var router = express.Router();
var CountriesCities = require('../models/CountriesCities');

router.get('/', function(req, res, next) {
    CountriesCities.getAllCountriesCities(function(err, rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            }
        });
});
module.exports = router;