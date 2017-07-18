# Avanti Test CRM

## Overview

### Backend
* The API portion of the application is a node express app that talks to a cloud based MongoDB.
* The main application is in app.js which has the route configs, middleware etc.
* The data model is defined using Mongoose under api/model
* Controller routes are in api/routes

### Client
* Client is an angular app served by the same app.js that hosts the api.
* Files are found undr public
* Material is used for layout and components.


## Assumptions

1. Internet connection
1. Node/NPM ins2talled on host machine
1. Bower installed for client build

## Build

### API

* npm install

### Client

* cd public
* bower installl

## Start

* node app.js

## Todos

* front end validation
* pagination or infinite scroll
* build pipeline
* styling
* environment configuration
