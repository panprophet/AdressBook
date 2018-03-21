var db = require('../dbconnection');
var Cities = {
    getAllCities: function(callback){
        return db.query("SELECT * FROM cities", callback);  
    },
    addCity: function(Cities, callback){
        return db.query("INSERT INTO cities  values(?, ?, ?)", [Cities.id, Cities.country_code, Cities.city_name], callback);
    }
};

module.exports = Cities;