#Weather App

A node and express applicaiton to retrieve a weather forecast. using the http://forecast.io API

##Node JSON API

Demo: <a href="http://weatherapp.eu01.aws.af.cm/api/weather/sydney/today" target="_blank">http://weatherapp.eu01.aws.af.cm/api/weather/sydney/today</a>

To get JSON data from the node API use the /api/weather endpoint e.g.

	localhost:1337/api/weather/sydney
	localhost:1337/api/weather/sydney/tomorrow
	localhost:1337/api/weather/sydney/[unix timestamp]

##Angular client

Demo: <a href="http://weatherapp.eu01.aws.af.cm/sydney/today" target="_blank">http://weatherapp.eu01.aws.af.cm/sydney/today</a>

To view a HTML version of the data use the built in Angular client  e.g.


	localhost:1337/weather/sydney
	localhost:1337/weather/sydney/tomorrow
	localhost:1337/weather/sydney/[unix timestamp]