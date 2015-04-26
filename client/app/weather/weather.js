(function(){

	angular.module('weatherman.forecast', []);

	angular.module('weatherman.forecast')
		.controller('ForecastController', forecastController)
		.factory('Forecast', forecastFactory);

	forecastController.$inject = ['$scope', '$routeParams', '$location', '$filter', 'Forecast'];
	forecastFactory.$inject = ['$http'];

	function forecastController($scope, $routeParams, $location, $filter, forecast){


		if($routeParams.location){

			$scope.location = $routeParams.location || undefined;

			$scope.weatherDate = $routeParams.day || undefined;

			loadWeather();

		}

		$scope.$watch('weatherDateSelector', function(newVer, oldVer){

			if(oldVer === newVer){return false;}

			$scope.changeDate(Math.round(new Date(newVer).getTime() / 1000));

		});

		$scope.$watch('weatherDate', function(newVer, oldVer){
			
			if(oldVer === newVer){return false;}

			loadWeather();
			
		});

		$scope.changeLocation = function(newLocation){

			updateParams(newLocation, $scope.weatherDate || undefined);

		}

		$scope.changeDate = function(newDate){
	
			updateParams($scope.location, newDate);
			
		}

		$scope.clearDate = function(){

			$location.path("/" + $scope.location);

		};

		$scope.open = function($event) {

			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		function updateParams(location, date){
			
			var path = '/' + location;

			if(date){
				path += '/' + date;
			}

			$location.path(path);

		}

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