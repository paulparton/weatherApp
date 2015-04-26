var request = require('request'),
	Q = require('q');

module.exports = {

	getWeather: getForecast

};

function getForecast(location, date, callback){
	
	if (typeof date === 'function') {
		callback = date;
		date = undefined;
	}

	var deferred = Q.defer();
	
	if(!location || !location.lat || !location.lng){
		deferred.reject(new Error('error, a location is required'));
	}

	var baseUrl = 'https://api.forecast.io/forecast/220e329b1bbdff1eba9f5998fc5b5b4c',
		weatherUrl = baseUrl + '/' + location.lat + ',' + location.lng;
		
	if(date){
		weatherUrl += ',' + date;
	}

	request.get(weatherUrl, function(err, response, body){

		if(err){
			deferred.reject(new Error(err));

		}else{
			deferred.resolve(body);
		}

	});

  	deferred.promise.nodeify(callback);

	return deferred.promise;

}
