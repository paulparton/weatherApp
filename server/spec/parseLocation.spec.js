describe('parseLocation Module', function(){
	
	var parseLocation,
		response;
	
	beforeEach(function(){

		parseLocation = require('../components/parseLocation');
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

	});

	it('should should get a google JSON response for the location', function(done){

		var location = "sydney";
    
	    parseLocation(location, function(err, result){

	    	var responseLocation = result.address_components[0].short_name.toLowerCase();

	    	expect(responseLocation).toEqual(location.toLowerCase());
			
			done();	

	    });

	});
	
	
});
