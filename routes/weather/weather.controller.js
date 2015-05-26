var weather = require('../../components/weather'),
	parseLocation = require('../../components/parseLocation'),
	parseDate = require('../../components/parseDate');

module.exports = {
	index: index,
	forecastByLocation:forecastByLocation,
	forecastByLocationAndDate:forecastByLocationAndDate
};

function index(){
	res.send('You must specify a location e.g. api/weather/sydney');
}

//Return a weather report by location only
function forecastByLocation(req, res){

	var locationText;

	//Convert the location text into lat and long
	parseLocation(req.params.location, parseLocationCallback);

	function parseLocationCallback(err, response){

		if(err){
			return res.send(500, err);
		}

		//Store the full formatted version of the parsed address to pass back to the client
		locationText = response.formatted_address;

		//Get a weather report
		weather.getWeather(response.geometry.location, getWeatherCallback);

	}

	function getWeatherCallback(err, result){

		if(err){
			return res.send(500, err);
		}

		//Add the formatted location description to the weather report
		result = JSON.parse(result);
		result.locationText = locationText;

		res.send(200, result);

	}	

}

//Return a weather report by location and date
function forecastByLocationAndDate(req, res){
	
	var date = parseDate(req.params.date),
		locationText;

	//Convert the location text into lat and long
	parseLocation(req.params.location, parseLocationCallback);

	function parseLocationCallback(err, response){

		if(err){
			return res.send(500, err);
		}

		//Store the full formatted version of the parsed address to pass back to the client
		locationText = response.formatted_address;

		//Get a weather report
		weather.getWeather(response.geometry.location, date, getWeatherCallback);

	}

	function getWeatherCallback(err, result){

		if(err){
			return res.send(500, err);
		}

		//Add the formatted location description to the weather report
		result = JSON.parse(result);
		result.locationText = locationText;

		res.send(200, result);

	}
	
}
