(function(){

	angular.module('weatherman', ['ngRoute', 'weatherman.forecast', 'pp.locationAutocomplete', 'pp.celciusConverter', 'ui.bootstrap']);

	angular.module('weatherman')
		.config(appConfiguration)

	function appConfiguration($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/weather/weather.html',
				controller: 'ForecastController',
			})		
			.when('/:location', {
				templateUrl: 'app/weather/weather.html',
				controller: 'ForecastController',
			})
			.when('/:location/:day', {
				templateUrl: 'app/weather/weather.html',
				controller: 'ForecastController',
			})

		// configure html5 to get links working on jsfiddle
	  	$locationProvider.html5Mode(true);
	};

}());