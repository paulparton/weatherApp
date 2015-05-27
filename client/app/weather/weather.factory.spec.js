describe('The weather factory', function(){
	
	var Forecast,
		$httpBackend;
	
	beforeEach(module('weatherman'));
	
	beforeEach(inject(function (_Forecast_,  _$httpBackend_) {
		
		Forecast = _Forecast_;
		$httpBackend = _$httpBackend_;
		
		$httpBackend.expect('GET', '/api/weather/"Sydney"/tomorrow')
			.respond(200, {currently:{}});
								
	}));
	
	it('Should request weather data', inject(function(Forecast, $httpBackend){
		
		var myData;
		
		Forecast.getForecast({location: "Sydney", date: "tomorrow"})
			.then(function(data){
				myData = data.data;
				expect(myData.currently).toBeDefined();		
			});
			
		$httpBackend.flush();			

	}));

});