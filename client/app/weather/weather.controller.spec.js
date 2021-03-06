describe('The weather controller', function(){
		
	var scope, createController, state, forecast, deferred, stateParams;

	beforeEach(module('weatherman'));

	beforeEach(inject(function ($controller, $rootScope, $httpBackend, $state, Forecast, $q) {

		$httpBackend.expect('GET', '/api/weather/"Sydney"')	
			.respond(200, {currently:{}});
		
		$httpBackend.expect('GET', 'app/weather/weather.html').respond(200, []);		
		
		createController = function(stateParams){
		
			scope = $rootScope.$new();
			
			$controller('ForecastController', {
				$scope: scope,
				$stateParams: stateParams
			});
					
		}

		state = $state;
        spyOn($state, 'go');	
	
	}));
	
	describe('The weather controller with a location in the statePrams', function(){
		
		beforeEach(function(){
			
			stateParams = {location: 'Sydney'};
			createController(stateParams);
					
		});

		it('It should load the weather on startup if parameters are provided', function(){
			
			spyOn(scope, "loadWeather");
			scope.init();
			expect(scope.loadWeather).toHaveBeenCalled();
			
		});
		
		it('should update the weather if the date selector changes', function(){
			
			spyOn(scope, "changeDate");
				
			scope.$digest();
			scope.weatherDateSelector = 1432249201;	
			
			scope.$digest();
			expect(scope.changeDate).toHaveBeenCalled();	
			
		});
		
		it('Should update the weather if the date option is picked', function(){
	
			spyOn(scope, "changeDate");
				
			scope.$digest();
			scope.weatherDate = 1432249201;	
			
			scope.$digest();
			expect(scope.changeDate).toHaveBeenCalled();
			
		});	
		
		it('pass the existing date, or undefined when changing location', function(){
			
			spyOn(scope, 'updateParams');
			
			scope.changeLocation('abc');
			expect(scope.updateParams).toHaveBeenCalledWith('abc', undefined);
			
			scope.weatherDate = "123";
	
			scope.changeLocation('abc');
			expect(scope.updateParams).toHaveBeenCalledWith('abc', '123');
			
		});
	
		it('pass the existing location when changing the date', function(){
			
			spyOn(scope, 'updateParams');
			
			scope.changeDate(123);
			expect(scope.updateParams).toHaveBeenCalledWith("Sydney", 123);
			
			scope.location = "test";
			scope.$digest();
			
			scope.changeDate(123);
			expect(scope.updateParams).toHaveBeenCalledWith("test", 123);
			
		});
			
		it('Should clear the date', function(){
			
			scope.updateParams('Sydney', '123');
			scope.$digest();
			
			expect(state.go).toHaveBeenCalledWith('byLocationAndDate', {location:'Sydney', day:'123'});
			
			scope.clearDate('test');
			scope.$digest();
			
			expect(state.go).toHaveBeenCalledWith('byLocation', {location:'Sydney'});
			
		});
		
		it('Should request a weather forecast from the web service when the controller loads', function(){
			
			spyOn(scope, 'loadWeather');
			
			scope.init();
			expect(scope.loadWeather).toHaveBeenCalled();
			
		});	
			
	});
	
	describe('The weather controller with no location in the statePrams', function(){
		
		beforeEach(function(){
			
			stateParams = {};
			createController(stateParams);
					
		});
		
		it('Should not request a weather forecast from the web service ', function(){
			
			spyOn(scope, 'loadWeather');
			
			scope.init();
			expect(scope.loadWeather).not.toHaveBeenCalled();
			
		});
	
	});
			
});
