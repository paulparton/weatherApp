'use strict';

var express = require('express'),
    app = express(),
    //Load route modules
    routes = require('./routes')(app);

//Start server
app.listen('1337');
