describe('parseDate Module', function(){

	var parseDate;

	beforeEach(function(){

		parseDate = require("../components/parseDate");

	});
	
	it('should confirm a valid a timestamp', function(){

		var dateStamp = 1430229600;

		parseDate(dateStamp, function(err, result){

			expect(err).toBeUndefined();

			expect(result).toBe(dateStamp);

		});

	});

	it('should reject an invalid a timestamp', function(){

		var badDateStamp = "x1234";

		parseDate(badDateStamp, function(err, result){

			expect(result).toBe(undefined);

			expect(err).toBeDefined();

		});

	});

	it('should convert a day of the week into a timestamp', function(){

		var date = "monday";

		parseDate(date, function(err, result){

			expect(err).toBeUndefined();

		});

	});
	
	it('should get the timestamp for "tomorrow"', function(){

		var date = "tomorrow";

		parseDate(date, function(err, result){

			expect(err).toBeUndefined();

		});

	});

	it('should get the timestamp for "today"', function(){

		var date = "today";

		parseDate(date, function(err, result){

			expect(err).toBeUndefined();

		});

	});

});