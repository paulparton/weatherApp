(function(){
	
	'use strict';

	angular.module('weatherman')
		.factory('Forecast', forecastFactory);

	forecastFactory.$inject = ['$http'];


	function forecastFactory($http){
		
		var factory = {
			getForecast: getForecast
		}

		return factory;

		function getForecast(params, callback){
			
			
			
			var url = '/api/weather/' + JSON.stringify(params.location);

			if(params.date){
				url += '/' + params.date;
			}

			$http.get(url)
				.success(function(result){

					return callback(null,result);

				})
				.error(function(err){
	
					return callback(err);

				});

		}

	}

}());