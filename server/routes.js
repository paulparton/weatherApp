var weatherRoutes = require('./routes/weather'),
	express = require('express');

module.exports = function(app){

	//Node API Endpoints
    app.use('/api/weather', weatherRoutes);

	//Client Angular application with HTML5 route support
	app.use("/bower_components", express.static(__dirname + "./../client/bower_components"));
	app.use("/components", express.static(__dirname + "./../client/components"));
	app.use("/css", express.static(__dirname + "./../client/css"));
	app.use("/app", express.static(__dirname + "./../client/app"));
	app.use("/scripts", express.static(__dirname + "./../client/scripts"));
	app.use("/*", express.static(__dirname + "./../client/"));

};
