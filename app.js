'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var apiRoutes = express.Router();
var app = express();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var customerRoutes = require('./api/routes/crm');

mongoose.Promise = Promise;
mongoose.connect('mongodb://admin:testing123@ds151062.mlab.com:51062/avanti');


module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

apiRoutes.get('/customers', customerRoutes.listCustomers);
apiRoutes.post('/customers', customerRoutes.addCustomer);
apiRoutes.put('/customers', customerRoutes.updateCustomer);
apiRoutes.delete('/customers/:id', customerRoutes.deleteCustomer);


app.use('/api', apiRoutes);

app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500).json(err);
});

var port = process.env.PORT || 10010;
app.listen(port);
