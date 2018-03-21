var db = require('../dbconnection');
var Countries = {
    getAllCountries: function(callback){
        return db.query("SELECT * from countries", callback);
    },
    getCountryByCode: function(country_name, callback){
        return db.query("SELECT country_code FROM countries WHERE country_name=?", [country_name], callback);
    }
};
module.exports = Countries;

/* ROUTES*/

