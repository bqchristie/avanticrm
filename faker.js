var mongoose = require('mongoose');
var Promise = require('bluebird');
var Customer = require('./api/model/customer');
var faker = require("faker");
var _ = require("lodash");

mongoose.Promise = Promise;
mongoose.connect('mongodb://admin:testing123@ds151062.mlab.com:51062/avanti');

var customerCount = 30;

for(var i=0; i <customerCount; i++) {
    console.log(faker.company.companyName());
    var customer = getCustomer();
    customer = new Customer(customer);
    customer.save().then(function () {
        console.log("...");
    }).catch(function (err) {
        return next(err);
    })
}


function getCustomer(){
    var customer = {
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        city:faker.address.city(),
        province: 'ON',
        postalCode:faker.address.zipCode(),
        created: new Date(),
        contacts: getContacts()
    }
    return customer;
}

function getContacts(){
    var contacts = [];
    var contactCount = _.random(0, 5);
    for(var i=0; i < contactCount; i++) {
        var contact = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.phoneNumber()
        }
        contacts.push(contact);
    }
    return contacts;
}