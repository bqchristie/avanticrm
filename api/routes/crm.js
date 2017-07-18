'use strict';
var util = require('util');
var Customer = require('../model/customer');
var _ = require('lodash');

module.exports = {
    addCustomer: addCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer,
    listCustomers: listCustomers
};


function addCustomer(req, res, next) {
    var customer = req.body;
    customer.created = new Date();
    customer = new Customer(customer);
    customer.save().then(function () {
        res.json(customer);
    }).catch(function (err) {
        return next(err);
    })
}

function updateCustomer(req, res, next) {
    var update = req.body;
    update.lastUpdated = new Date();
    Customer.findByIdAndUpdate(update._id, update, {new: true}).then(function (customer) {
        res.json(customer);
    }).catch(function (err) {
        next(err);
    })
}

function deleteCustomer(req, res, next) {

    Customer.findById(req.params.id).then(function (customer) {
        if (customer) {
            customer.remove().then(function () {
                var msg = util.format('Deleted Customer ' + customer.name);
                res.json(msg);
            }).catch(function (err) {
                next(err);
            })
        }
        else {
            next({message: "Can't find or delete customer with id: " + req.params.id});
        }
    }).catch(function (err) {
        return next(err);
    });
}

function listCustomers(req, res) {
    Customer.find({}, function (err, customers) {
        if (err) {
            throw err;
        }
        res.send(_.sortBy(customers, 'name'));
    });
}
