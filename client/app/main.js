(function(){

	angular.module('weatherman', ['ui.router', 'pp.locationAutocomplete', 'pp.celciusConverter', 'ui.bootstrap']);

	angular.module('weatherman')
		.config(appConfiguration)
						      
	function appConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {
		
$locationProvider.html5Mode(true);
	/**	
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
			**/
		// configure html5 to get links working on jsfiddle
	  	
	};

}());