(function(){
	
	'use strict';

	angular.module('weatherman')
		.factory('Forecast', forecastFactory);

	forecastFactory.$inject = ['$http'];


	function forecastFactory($http){
		
		//Public api
		var factory = {
			getForecast: getForecast
		}

		return factory;
		
		//Factory method
		function getForecast(params, callback){
			
			//Build the web service url from the params provided
			var url = '/api/weather/' + JSON.stringify(params.location);

			if(params.date){
				url += '/' + params.date;
			}

			return $http.get(url);

		}

	}

}());