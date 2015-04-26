(function(){
	
	'use strict';

	angular.module('pp.celciusConverter', []);

	angular.module('pp.celciusConverter')
		.filter('celcius', celciusConverterFilter);

	function celciusConverterFilter(){

		return function(item){

			var output = (item - 32) * (5/9);

			return Math.round(output);

		}

	}
	

}());