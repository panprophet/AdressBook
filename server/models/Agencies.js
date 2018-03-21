var db = require('../dbconnection');

var Agencies = {
    getAllAgencies: function(callback){
        return db.query("SELECT agency.id as id, agency.name, agency.adress, cities.city_name as cityname, countries.country_name as countryname, countries.country_code as country_code, agency.city_id as city_id, agency.phone, agency.email, agency.web FROM agency LEFT JOIN cities ON agency.city_id = cities.id  INNER JOIN countries on cities.country_code = countries.country_code GROUP by agency.name", callback);
    },
    addAgency: function(Agencies, callback){
        return db.query("INSERT INTO agency VALUES(?,?,?,?,?,?,?)", [Agencies.id, Agencies.name, Agencies.adress, Agencies.city_id, Agencies.phone, Agencies.email, Agencies.web], callback);
    },
    deleteAgency: function(id, callback){
        return db.query("DELETE FROM agency WHERE id=?", [id], callback);  
    },
    updateAgency: function(id, Agencies, callback){
        return db.query("UPDATE agency SET name=?, adress=?, city_id=?, phone=?, email=?, web=? WHERE id=?", [Agencies.name, Agencies.adress, Agencies.city_id, Agencies.phone, Agencies.email, Agencies.web, id], callback);
    }
};

module.exports = Agencies;