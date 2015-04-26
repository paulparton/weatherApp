var geocoder = require('geocoder');

//Take a location description and return geocode data
module.exports = function(location, callback){

	geocoder.geocode(location, function(err, res){

		if(err){

			return callback(err);

		}
		
		return callback(undefined, res.results[0]);
	
	});

};