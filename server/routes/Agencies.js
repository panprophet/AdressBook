var express = require('express');
var router = express.Router();
var Agencies = require('../models/Agencies');

router.get("/", function(req, res, next) {
    Agencies.getAllAgencies(function(err, rows){
        if(err){
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post("/", function(req, res, next){
    Agencies.addAgency(req.body, function(err, rows){
        if(err){
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});
router.put("/:id", function(req, res, next){
   Agencies.updateAgency(req.params.id, req.body, function(err, rows){
       if(err){
           res.json(err);
       } else {
           res.json(req.body);
       }
   }); 
});
router.delete('/:id', function(req, res, next){
   Agencies.deleteAgency(req.params.id, function(err, count){
      if(err){
          res.json(err);
      } else {
          res.json(count);
      }
   });
});
module.exports = router;