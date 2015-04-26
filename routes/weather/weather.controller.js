var weather = require('../../components/weather'),
	parseLocation = require('../../components/parseLocation'),
	parseDate = require('../../components/parseDate');

module.exports = {
	forecastByLocation:forecastByLocation,
	forecastByLocationAndDate:forecastByLocationAndDate
};

function forecastByLocation(req, res){

	var locationText;

	parseLocation(req.params.location, parseLocationCallback);

	function parseLocationCallback(err, response){

		if(err){
			return res.send(500, err);
		}

		locationText = response.formatted_address;

		weather.getWeather(response.geometry.location, getWeatherCallback);

	}

	function getWeatherCallback(err, result){

		if(err){
			return res.send(500, err);
		}

		result = JSON.parse(result);
		result.locationText = locationText;

		res.send(200, result);

	}	

}

function forecastByLocationAndDate(req, res){
	
	var date = parseDate(req.params.date),
		locationText;


	parseLocation(req.params.location, parseLocationCallback);

	function parseLocationCallback(err, response){

		if(err){
			return res.send(500, err);
		}
		
		locationText = response.formatted_address;
		weather.getWeather(response.geometry.location, date, getWeatherCallback);

	}

	function getWeatherCallback(err, result){

		if(err){
			return res.send(500, err);
		}

		result = JSON.parse(result);
		result.locationText = locationText;

		res.send(200, result);

	}
	
}
