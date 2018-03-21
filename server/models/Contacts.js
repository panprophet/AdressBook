var db = require('../dbconnection');
var Contacts = {
    getAllContacts: function(callback){
        
        return db.query("SELECT contact.id as id, contact.first_name as firstname, contact.last_name as lastname, agency.name as agencyname, agency.id as agencyid, contact.phone1, contact.phone2, contact.email, contact.web, contact.avatar from contact inner JOIN agency on contact.agency_id = agency.id", callback);
     
    },
    
    /* OVO KONTAM DA SE NE VUCE DINAMICKI NEGO SE VRSI PRETRAGA JSON-a GENERISANOG IZ AllContacts */
    
//    getContactByName: function(firstname, callback){
//        return db.query("SELECT contact.first_name as firstname, contact.last_name as lastname, agency.name as agencyname, agency.id as id, contact.phone1, contact.phone2, contact.email, contact.web, contact.avatar from contact inner JOIN agency on contact.agency_id = agency.id WHERE firstname=?", [firstname], callback);
//    },
//    getContactByLastName: function(lastname, callback){
//        return db.query("SELECT contact.first_name as firstname, contact.last_name as lastname, agency.name as agencyname, agency.id as id, contact.phone1, contact.phone2, contact.email, contact.web, contact.avatar from contact inner JOIN agency on contact.agency_id = agency.id WHERE lastname=?", [lastname], callback);
//    },
//    getContactByAgency: function(agencyname, callback){
//        return db.query("SELECT contact.first_name as firstname, contact.last_name as lastname, agency.name as agencyname, agency.id as id, contact.phone1, contact.phone2, contact.email, contact.web, contact.avatar from contact inner JOIN agency on contact.agency_id = agency.id where agencyname=?", [agencyname], callback);
//    },
    addContact: function(Contacts, callback){
        return db.query("INSERT INTO contact values(?,?,?,?,?,?,?,?,?)", [Contacts.id, Contacts.first_name, Contacts.last_name, Contacts.agency_id, Contacts.phone1, Contacts.phone2, Contacts.email, Contacts.web, Contacts.avatar], callback);
    },
    deleteContact: function(id, callback){
        return db.query("DELETE FROM contact where id=?", [id], callback);
    },
    updateContact: function(id, Contacts, callback){
        return db.query("UPDATE contact set first_name=?, last_name=?, agency_id=?, phone1=?, phone2=?, email=?, web=?, avatar=? where id=?", [Contacts.first_name, Contacts.last_name, Contacts.agency_id, Contacts.phone1, Contacts.phone2, Contacts.email, Contacts.web, Contacts.avatar, id], callback);
    }
};
module.exports = Contacts;

/* ROUTES*/

