
(function(){
	
	'use strict';
	
	angular.module('weatherman')
	  .config(function ($stateProvider) {
		  $stateProvider
		    .state('default', {
		      url: "/",
			  controller: 'ForecastController',
		      templateUrl: "app/weather/weather.html"
		    })
		    .state('byLocation', {
		      url: "/:location/",
			  controller: 'ForecastController',
		      templateUrl: "app/weather/weather.html"
		    })
		    .state('byLocationAndDate', {
		      url: "/:location/:day/",
			  controller: 'ForecastController',
		      templateUrl: "app/weather/weather.html"
		    })
	  });
  
}());