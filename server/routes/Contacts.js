var express = require('express');
var router = express.Router();
var Contacts = require('../models/Contacts');

/* GET users listing. */
router.get('/', function(req, res, next) {

        Contacts.getAllContacts(function(err, rows){
           if(err){
               res.json(err);
           } else {
               res.json(rows);
           }
        });
    
});


router.post('/', function(req, res, next){
    Contacts.addContact(req.body, function(err, count){
       if(err){
           res.json(err);
       } else {
           res.json(req.body);
       }

    });
});
router.put("/:id", function(req, res, next){
   Contacts.updateContact(req.params.id, req.body, function(err, rows){
   if(err){
       res.json(err);
   } else {
       res.json(req.body);
   }
}); 
});
router.delete('/:id', function(req, res, next){
   Contacts.deleteContact(req.params.id, function(err, count){
      if(err){
          res.json(err);
      } else {
          res.json(count);
      }
   });
});

module.exports = router;