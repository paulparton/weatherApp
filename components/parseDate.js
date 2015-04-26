var dateWords = {
	today: new Date(),
	tomorrow: getTomorrow(),
	sunday: getNextDay('sunday'),
	monday: getNextDay('monday'),
	tuesday: getNextDay('tuesday'),
	wednesday: getNextDay('wednesday'),
	thursday: getNextDay('thursday'),
	friday: getNextDay('friday'),
	saturday: getNextDay('saturday')
};

module.exports = function(date){

	//Check if the date is a valid "date word", convert it to a timestamp
	if(dateWords[date]){
		var newDate = dateWords[date];
		return Math.round(newDate.getTime() / 1000);
	}

	//If the provided date is not a valid date word, treat it like a timestamp
	date = parseInt(date);

	//Check that the date is a valid timestamp
	if(validateTime(date)){
		return(date);
	}else{
		return undefined;
	}

};

//Check if a timestamp is valid
function validateTime(timestamp){
	
	var validation = new Date(timestamp * 1000).getTime();

	return validation > 0;

}

//Get a date object for tomorrow
function getTomorrow(){

	var tomorrow = new Date();
	tomorrow.setTime(tomorrow.getTime() + (1000*3600*24));
	return tomorrow;

}

//Get a date object for the next occurance of a name date of the week
//Some of this code came from a SO answer
function getNextDay(day){

	var dayIndex,
		returnDate,
		returnDay,
		days = {
			sunday: 0, 
			monday: 1, 
			tuesday: 2,
			wednesday: 3, 
			thursday: 4, 
			friday: 5, 
			saturday: 6
		};

  	dayIndex = days[day.toLowerCase()];

	if (typeof dayIndex == undefined) {
		throw new Error('"' + day + '" is not a valid input.');
	}

	returnDate = new Date();

	returnDay = returnDate.getDay();

	if (dayIndex !== returnDay) {
		returnDate.setDate(returnDate.getDate() + (dayIndex + (7 - returnDay)) % 7);
	}

	returnDate.setHours(0);
	returnDate.setMinutes(0);
	returnDate.setSeconds(0);
	returnDate.setMilliseconds(0);
  
	return returnDate;
}