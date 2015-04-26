var weatherRoutes = require('./routes/weather'),
	express = require('express');

module.exports = function(app){

    app.use('/api/weather', weatherRoutes);

  	//app.route('/*').get(function(req, res) {
      //res.sendfile('client/index.html');
    //});
	
	app.use("/bower_components", express.static(__dirname + "/client/bower_components"));
	app.use("/components", express.static(__dirname + "/client/components"));
	app.use("/css", express.static(__dirname + "/client/css"));
	app.use("/app", express.static(__dirname + "/client/app"));
	app.use("/*", express.static(__dirname + "/client/"));

    //Other routes passed to Angular front end
	//app.use(express.static(__dirname + '/client/'));

	//app.use(function(req, res) {
	  //return res.redirect(req.protocol + '://' + req.get('Host') + '/' + req.url)
	//});

};
