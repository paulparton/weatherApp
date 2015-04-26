var geocoder = require('geocoder');

module.exports = function(location, callback){

	geocoder.geocode(location, function(err, res){

		if(err){

			return callback(err);

		}
		
		return callback(undefined, res.results[0]);
	
	});

};

function validateLatLng(){
	
}
