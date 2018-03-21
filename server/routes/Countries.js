var express = require('express');
var router = express.Router();
var Countries = require('../models/Countries');

/* GET users listing. */
router.get('/:country_name?/:country_code?', function(req, res, next) {
    if(req.params.country_name){
       Countries.getCountryByCode(req.params.country_name, function(err, rows){
           if(err){
               res.json(err);
           } else {
               res.json(rows);
           }
       });
    } else {
        Countries.getAllCountries(function(err, rows){
           if(err){
               res.json(err);
           } else {
               res.json(rows);
           }
        });
    }
});

module.exports = router;
