describe('The weather controller', function(){
	
	var scope, createController;
		
	beforeEach(module('weatherman'));

	beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
		
		scope = $rootScope.$new();
		
		$httpBackend.expect('GET', '/api/weather/"Sydney"')	
			.respond(200, {currently:{}});
		
		$httpBackend.expect('GET', 'app/weather/weather.html').respond(200, []);
	
		$controller('ForecastController', {
			$scope: scope,
			$stateParams: {location: 'Sydney'}
		});			
		
	}));
	
	it('It should load the weather on startup if parameters are provided', function(){
		
		//var testController = createController({location: 'Sydney'});
		spyOn(scope, "loadWeather");
		scope.init();
		expect(scope.loadWeather).toHaveBeenCalled();
		
	});
	
	it('should update the weather if the date selector changes', function(){
		
		spyOn(scope, "changeDate").and.callFake(function(){
			
		});
			
		scope.$apply(function(){
			scope.weatherDateSelector = 1432249201;	
		});

		expect(scope.changeDate).toHaveBeenCalled();
	
	});
	
	it('Should update the weather if the date option is picked', function(){
		
	});	
	
	it('pass the existing date, or undefined when changing location', function(){
		
	});

	it('pass the existing location when changing the date', function(){
		
	});
		
	it('Should clear the date', function(){
		
	});
	
	it('Should request a weather forecast from the web service', function(){
		
	});	

	
});
