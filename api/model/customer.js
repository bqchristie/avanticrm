var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactsSchema  = new Schema({
    firstName: 'string',
    lastName: 'string',
    phone: 'string',
})

var customerSchema = new Schema({
    name: 'string',
    address: 'string',
    city: 'string',
    province: 'string',
    postalCode: 'string',
    created: 'date',
    lastUpdated: 'date',
    contacts: [contactsSchema]
});



module.exports = mongoose.model('Customer', customerSchema);
