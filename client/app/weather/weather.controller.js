
(function(){
	'use strict';
	
	console.log('insude controller module');
	
	angular.module('weatherman')
		.controller('ForecastController', forecastController);
	
	forecastController.$inject = ['$scope', '$stateParams', '$state', '$location', '$filter', 'Forecast'];
	
	function forecastController($scope, $stateParams, $state, $location, $filter, forecast){
		
		//Check for initial params to load weather
		if($stateParams.location){
			$scope.location = $stateParams.location || undefined;
			$scope.weatherDate = $stateParams.day || undefined;
			loadWeather();
		}
	
		//If the weather date selector changes
		$scope.$watch('weatherDateSelector', function(newVer, oldVer){
			
			//Prevent run on load
			if(oldVer === newVer){return false;}
			
			//Update the forecast date
			$scope.changeDate(Math.round(new Date(newVer).getTime() / 1000));
			
		});
		
		//If the weather date picker changes
		$scope.$watch('weatherDate', function(newVer, oldVer){
			
			//Prevent run on load
			if(oldVer === newVer){return false;}

			//loadWeather();
			//updateParams($scope.location, $scope.weatherDate);
			$scope.changeDate($scope.weatherDate);
			
		});
		
		//Update the location of the forecast
		$scope.changeLocation = function(newLocation){

			updateParams(newLocation, $scope.weatherDate || undefined);

		}
		
		//Update the date of the forecast
		$scope.changeDate = function(newDate){

			updateParams($scope.location, newDate);
			
		}
	
		//Clear the date of the forecast
		$scope.clearDate = function(){

			updateParams($scope.location);

		};
		
		//Show the calendar
		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = true;
		};
		
		//Update the forecast parameters
		function updateParams(location, date){
			
			var newParams = {
				location: location
			};

			if(date){
				newParams.day = date;	
				$state.go('byLocationAndDate', newParams);
			}else{
				$state.go('byLocation', newParams);
			}

		}
	
		//Load a weather forecast from the web service
		function loadWeather(){

			$scope.displayDate = $scope.weatherDate;

			if ($scope.weatherDate && !isNaN($scope.weatherDate)){
				$scope.displayDate = $filter('date')($scope.displayDate * 1000, 'dd MMM yyyy');
			}			

			var params = {
				location: $scope.location,
				date: $scope.weatherDate || undefined
			};

			$scope.loading = true;
			
			forecast.getForecast(params, function(err, response){

				$scope.loading = false;

				if(err){
					$scope.error = err;
					return false;
				}

				$scope.location = response.locationText;
				$scope.forecast = response;

			});

		}

	}	
	
}());
	
		