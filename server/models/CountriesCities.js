var db = require('../dbconnection');
var CountiresCities = {
    getAllCountriesCities: function(callback){
        return db.query("SELECT DISTINCT cities.id as cityid, countries.id as countryid, cities.city_name, countries.country_code as country_code, countries.country_name FROM cities INNER JOIN countries on cities.country_code = countries.country_code", callback);  
    }
};

module.exports = CountiresCities;