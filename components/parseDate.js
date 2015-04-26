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

	//Check if the date is a dateword, convert it to a timestamp
	if(dateWords[date]){
		var newDate = dateWords[date];
		return Math.round(newDate.getTime() / 1000);
	}

	date = parseInt(date);

	//Check that the date is a valid timestamp
	if(validateTime(date)){
		return(date);
	}else{
		console.log('is not valid');
		return undefined;
	}

};

function validateTime(timestamp){
	
	var validation = new Date(timestamp * 1000).getTime();

	return validation > 0;

}

function getTomorrow(){

	var tomorrow = new Date();
	tomorrow.setTime(tomorrow.getTime() + (1000*3600*24));
	return tomorrow;
}

function getNextDay(day, resetTime){
	console.log("get next day!", day);
  var days = {
    sunday: 0, monday: 1, tuesday: 2,
    wednesday: 3, thursday: 4, friday: 5, saturday: 6
  };

  var dayIndex = days[day.toLowerCase()];

  if (typeof dayIndex == undefined) {
    throw new Error('"' + day + '" is not a valid input.');
  }


  var returnDate = new Date();
  var returnDay = returnDate.getDay();
  if (dayIndex !== returnDay) {
    returnDate.setDate(returnDate.getDate() + (dayIndex + (7 - returnDay)) % 7);
  }

  if (resetTime) {
    returnDate.setHours(0);
    returnDate.setMinutes(0);
    returnDate.setSeconds(0);
    returnDate.setMilliseconds(0);
  }
  return returnDate;
}