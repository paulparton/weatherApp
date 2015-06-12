describe('weather module', function(){

	var weather,
		location,
		date;

	beforeEach(function(){

		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		weather = require('../components/weather');
		location = {
			lat:-33.86749, 
			lng:151.20699
		};
		date = 1430044265;

	});

	it('Should run a callback if called with just a location', function(done){

		weather.getWeather(location, function(err, result){
				
			expect(err).toBeNull();
			expect(result).toBeDefined();	

			done();

		});


	});

	it('Should run a callback if called with a location and a day / timestamp', function(done){

		weather.getWeather(location, date, function(err, result){
			
			expect(err).toBeNull();
			expect(result).toBeDefined();

			done();

		});


	});

	it('Should return a promise if called with just a location', function(done){

		weather.getWeather(location).then(function(result){

			expect(result).toBeDefined();
			done();

		});

	});

	it('Should return a promise if called with a location and timestamp', function(done){

		weather.getWeather(location, date).then(function(result){

			expect(result).toBeDefined();
			done();

		});

	});
	
	
});