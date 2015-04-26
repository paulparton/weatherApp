var express = require('express'),
    controller = require('./weather.controller.js'),
    router = express.Router();

//Pass params as query string. If there is no params show api doc
router.get('/', controller.forecastByLocation);
router.get('/:location', controller.forecastByLocation);
router.get('/:location/:date', controller.forecastByLocationAndDate);


module.exports = router;