var express = require('express');
var router = express.Router();

var Countries = require('../models/Countries');
var Cities = require('../models/Cities');
var Contacts = require('../models/Contacts');
var Agencies = require('../models/Agencies');

router.get('/Countries', Countries.getAllCountries);
router.get('/Cities', Cities.getAllCities);
router.get('/Contacts', Contact.getAllContacts);
router.get('/Agencies', Agencies.getAllAgencies);

module.exports = router;