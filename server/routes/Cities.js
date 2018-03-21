var express = require('express');
var router = express.Router();
var Cities = require('../models/Cities');

router.get('/:country_code?', function(req, res, next) {
   if(req.params.country_code){
        Cities.getCitiesByName(req.params.country_code, function(err, rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            } 
        });
    } else {
        Cities.getAllCities(function(err, rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.post('/', function(req, res, next){
    Cities.addCity(req.body, function(err, count){
       if(err){
           res.json(err);
       } else {
           res.json(req.body);
       }

    });
});

module.exports = router;