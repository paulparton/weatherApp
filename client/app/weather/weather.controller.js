(function(){
	
	'use strict';
	
	angular.module('weatherman')
		.controller('ForecastController', forecastController);
	
	forecastController.$inject = ['$scope', '$stateParams', '$state', '$location', '$filter', 'Forecast'];
	
	function forecastController($scope, $stateParams, $state, $location, $filter, forecast){
		
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
			
			$scope.changeDate($scope.weatherDate);
			
		});
		
		//Update the location of the forecast
		$scope.changeLocation = function(newLocation){

			$scope.updateParams(newLocation, $scope.weatherDate || undefined);

		}
		
		//Update the date of the forecast
		$scope.changeDate = function(newDate){

			$scope.updateParams($scope.location, newDate);
			
		}
	
		//Clear the date of the forecast
		$scope.clearDate = function(){

			$scope.updateParams($scope.location);

		};
		
		//Show the calendar
		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = true;
		};
		
		//Update the forecast parameters
		$scope.updateParams = function (location, date){
			
			var newParams = {
				location: location
			};

			if(date){
				newParams.day = date;	
				$state.go('byLocationAndDate', newParams);
			}else{
				$state.go('byLocation', newParams);
			}

		};
	
		//Load a weather forecast from the web service
		$scope.loadWeather = function (){		
							
			//Prepare params for the web service
			var params = {
				location: $scope.location,
				date: $scope.weatherDate || undefined
			};
			
			//Display the loading message
			$scope.loading = true;
			
			//Load weather data from the web service
			forecast.getForecast(params)
				.success(function(result){

					//Hide the loading message
					$scope.loading = false;
					
					//Store the formatted location name
					$scope.location = result.locationText;
				
					//Store the full response object
					$scope.forecast = result;

				})
				.error(function(err){
					
					//Hide the loading message
					$scope.loading = false;
					
					$scope.error = err;

				});

		};
		
		$scope.init = function(){
			//Check for initial params to load weather
			if($stateParams.location){
				$scope.location = $stateParams.location || undefined;
				$scope.weatherDate = $stateParams.day || undefined;
				$scope.loadWeather();
			}
		};
		
		$scope.init();
		
	}	
	
}());
	
		